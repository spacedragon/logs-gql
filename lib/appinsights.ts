import { Env, CustomEvent, Dependency } from "./types";
import { ApplicationInsightsDataClient } from "@azure/applicationinsights-query";
import { BasicAuthenticationCredentials } from "@azure/ms-rest-js";
import { HttpResponseError } from "./error";
import { Column } from "@azure/applicationinsights-query/esm/models";

export async function executeQuery(env:Env, q: string, timespan?: string) {
  let appId = process.env.TEST_INSIGHTS_API_ID;
  let appKey = process.env.TEST_INSIGHTS_API_KEY;
  switch (env) {
    case Env.Prod:
      appId = process.env.PROD_INSIGHTS_API_ID;
      appKey = process.env.PROD_INSIGHTS_API_KEY;
      break;
    case Env.Test:
    default:
      appId = process.env.TEST_INSIGHTS_API_ID;
      appKey = process.env.TEST_INSIGHTS_API_KEY;
  }

  const creds = new BasicAuthenticationCredentials(appKey, "");
  const client = new ApplicationInsightsDataClient(creds);
  const query = {
    query: `set query_take_max_records=10001;${q}`,
    timespan,
  };
  const result = await client.query.execute(appId, query);
  if (result._response.status === 200) {
    const table = result.tables[0];
    return table;
  } else {
    throw new HttpResponseError(
      result._response.status,
      result._response.bodyAsText
    );
  }
}

export async function query(
  env: Env,
  table: string,
  filter?: string,
  limit: number = 100,
  timespan: string = "P1D"
) {
  return executeQuery(env, `${table} ${filter ? "| " + filter : ""} | limit ${limit}`, timespan);
}

export async function queryDependencies(
  env: Env,
  table: string,
  filter?: string,
  limit: number = 100,
  timespan: string = "P1D"
): Promise<Dependency[]> {
  const tableResult = await query(env, table, filter, limit, timespan);
  const results = tableResult.rows.map((row) =>
    parseRow(tableResult.columns, row)
  );
  results.forEach((r) => {
    if (r.customDimensions) {
      const requestId = r.customDimensions["x-ms-client-request-id"];
      if (requestId) {
        r.customDimensions.requestId = requestId;
      }
    }
  });
  return results;
}

export async function executeCustomEventsQuery(
  env: Env,
  q: string,
  timespan: string = "P1D"
): Promise<CustomEvent[]> {
  const table = await executeQuery(env, q, timespan);
  return table.rows.map((row) => parseRow(table.columns, row));
}

export async function queryCustomEvents(
  env: Env,
  filter?: string,
  limit: number = 100,
  timespan: string = "P1D"
): Promise<CustomEvent[]> {
  const table = await query(env, "customEvents", filter, limit, timespan);
  return table.rows.map((row) => parseRow(table.columns, row));
}

export async function queryUserErrors(
  env: Env,
  filter?: string,
  limit: number = 100,
  timespan: string = "P1D"
): Promise<CustomEvent[]> {
  const table = await query(env, "userErrors", filter, limit, timespan);
  return table.rows.map((row) => parseRow(table.columns, row));
}

function parseRow(columns: Column[], row: any[]) {
  const obj: any = {};
  columns.forEach((col, idx) => {
    const name = col.name.replace("_", "");
    const value = row[idx];
    switch (col.type) {
      case "dynamic":
        obj[name] = JSON.parse(value);
        if (name === "customDimensions") {
          if (obj[name].Flight) {
            const flights = [];
            const flight = JSON.parse(obj[name].Flight);
            for (const key of Object.keys(flight)) {
              if (flight[key]) {
                flights.push(key);
              }
            }
            obj[name].Flight = flights;
          }
        }
        break;
      default:
        obj[name] = value;
    }
  });
  return obj;
}
