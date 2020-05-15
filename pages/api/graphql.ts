import { ApolloServer, gql } from "apollo-server-micro";
import { GraphQLScalarType } from "graphql"
import Cors from "micro-cors";
import {
  CustomEvent,
  CustomEvents,
  QueryCustomEventsArgs,
  CustomEventsByQueryArgs,
  Env,
  CustomEventsByScenarioArgs,
  QueryDependenciesArgs,
  DependenciesByQueryArgs,
  Dependencies,
  SmtLog,
  SmtLogsAllLogsArgs,
  QuerySmtLogsArgs,
  SmtLogs,
  SmtLogResponseBodyDecodedArgs,
  DependencyCustomDimension,
  DependenciesNewDependenciesArgs,
  UserErrors,
  UserErrorsByExtensionArgs,
  CustomEventDependenciesArgs,
} from "../../lib/types";
import { queryCustomEvents, queryDependencies, queryUserErrors, query, executeQuery, executeCustomEventsQuery } from "../../lib/appinsights";
import GraphqlJSON from "graphql-type-json";
import { decode } from "../../lib/decode";
import { querySmtLog, getSmtLog } from "../../lib/kusto";
const typeDefs = gql`
  scalar JSON
  enum Env {
    PROD
    TEST
  }
  type CustomDimension {
    AppVersion: String
    ClientType: String
    ClientVersion: String
    ComponentName: String
    CorrelationId: String
    EventId: String
    EventTime: String
    Extension: String
    Flight: [String]
    Language: String
    Path: String
    PivotName: String
    Region: String
    RegionalFormat: String
    ResourceGroup: String
    Route: String
    RunId: String
    SelectedPivotKey: String
    SessionId: String
    Subscription: String
    SubscriptionId: String
    TelemetryEventVersion: String
    Theme: String
    View: String
    WorkspaceId: String
    WorkspaceLocation: String
    WorkspaceName: String
    WorkspaceRegion: String
    isMicrosoftEmployee: Boolean
  }
  type CustomEvent {
    timestamp: String!
    operationId: ID!
    operationParentId: ID
    userId: ID
    name: String!
    itemType: String
    customDimensions: CustomDimension
    operationName: String
    operationSyntheticSource: String
    sessionId: String
    userAuthenticatedId: String
    userAccountId: String
    applicationVersion: String
    clientType: String
    clientModel: String
    clientOS: String
    clientIP: String
    clientCity: String
    clientStateOrProvince: String
    clientCountryOrRegion: String
    clientBrowser: String
    cloudRoleName: String
    cloudRoleInstance: String
    appId: String
    appName: String
    iKey: String
    sdkVersion: String
    itemId: String
    itemCount: Int
    dependencies(success: Boolean = false): [Dependency]
  }

  input QueryInput {
    "custom query string before limit"
    filter: String = ""
    "limit result size"
    limit: Int = 100
    "time range"
    timespan: String = "P1D"
  }

  type DependencyCustomDimension {
    ApiPath: String!
    AppVersion: String
    ClientVersion: String
    ComponentName: String
    Extension: String
    Flight: [String]
    HttpMethod: String
    Language: String
    Path: String
    Region: String
    RegionalFormat: String
    ResourceGroup: String
    Route: String
    SearchParams: String
    Subscription: String
    SubscriptionId: String
    Theme: String
    View: String
    WorkspaceId: String
    WorkspaceLocation: String
    WorkspaceName: String
    WorkspaceRegion: String
    correlation: String
    errorCodes: String
    isAborted: Boolean
    isMicrosoftEmployee: Boolean
    responseHeaders: JSON
    requestId: String
    request: SmtLog
  }

  type Dependency {
    timestamp: String!
    id: ID!
    name: String!
    type: String
    target: String
    itemType: String
    customDimensions: DependencyCustomDimension
    operationId: ID!
    operationName: String
    operationParentId: ID
    sessionId: String
    useId: String
    clientType: String
    clientModel: String
    clientOS: String
    clientIP: String
    clientCity: String
    clientStateOrProvince: String
    clientCountryOrRegion: String
    clientBrowser: String
    appId: String
    appName: String
    iKey: String
    sdkVersion: String
    itemId: String
    itemCount: Int
    url: JSON
    path: [String]
    api: String
    apiPath: String
    apiPath2: String
  }

  type CustomEvents {
    byScenario(
      scenario: String = ""
      extension: String = "visual-interface"
      query: QueryInput = {}
    ): [CustomEvent]
    byQuery(query: QueryInput = {}): [CustomEvent]
  }

  type Dependencies {
    newDependencies(query: QueryInput = {}): [Dependency]
    byQuery(query: QueryInput = {}): [Dependency]
  }

  type UserErrors {
    byQuery(query: QueryInput = {}): [CustomEvent]
    byExtension(extensions: [String]): [CustomEvent]
  }

  type SmtLog {
    Table: String
    TIMESTAMP: String
    Tenant: String
    Role: String
    RoleInstance: String
    Level: Int,
    ProviderGuid: String,
    ProviderName: String,
    EventId: Int,
    Pid: Int,
    Tid: Int,
    OpcodeName: String,
    KeywordName: String,
    TaskName: String,
    ChannelName: String,
    EventMessage: String,
    ActivityId: String,
    controllerName: String,
    actionName: String
    httpStatusCode: Int
    errorCode: String
    errorSubCodes: Int
    durationMs: Int,
    correlationRequestId: String,
    requestId: String,
    requestUrl: String,
    userAgent: String,
    exception: String,
    subscriptionId: String,
    resourceGroup: String,
    workspaceName: String,
    workspaceRegion: String,
    requestorType: String,
    requestorId: String,
    requestorIp: String,
    arguments: String,
    argumentsDecoded: JSON,
    workspaceId: String,
    tenantId: String,
    SourceNamespace: String,
    SourceMoniker: String,
    SourceVersion: String,
    responseBody: String,
    responseBodyDecoded(showRaw: Boolean): JSON
    responseItemCount: String,
    hbiWorkspace: String,
    referer: String,
    appVersion: String
  }

  type SmtLogs {
    allLogs(query: QueryInput = {}): [SmtLog]
    byRequestId(requestId: String!): SmtLog
  }

  type Query {
    customEvents(env: Env = PROD): CustomEvents @cacheControl(maxAge: 60)
    dependencies(env: Env = PROD): Dependencies @cacheControl(maxAge: 60)
    userErrors(env: Env= PROD): UserErrors @cacheControl(maxAge: 60)
    smtLogs(env: Env = PROD): SmtLogs @cacheControl(maxAge: 60)
  }
`;

const resolvers = {
  JSON: GraphqlJSON,
  Query: {
    customEvents: (
      _parent: any,
      args: QueryCustomEventsArgs,
      context: any
    ) => {
      const env = args.env;
      context.env = env;
      return {} as CustomEvents;
    },
    userErrors: (
      _parent: any,
      args: QueryCustomEventsArgs,
      context: any
    ) => {
      const env = args.env;
      context.env = env;
      return {} as UserErrors;
    },
    dependencies: (
      _parent: any,
      args: QueryDependenciesArgs,
      context: any
    ) => {
      const env = args.env;
      context.env = env;
      return {} as Dependencies;
    },
    smtLogs(_parent: any, args: QuerySmtLogsArgs,  context: any) {
      const env = args.env;
      context.env = env;
      return {
        env,
      } as SmtLogs
    } 
  },
  Dependencies: {
    newDependencies: (_parent: CustomEvents, args: DependenciesNewDependenciesArgs, context: any) => {
      const env: Env = context["env"];
      const { filter, limit, timespan } = args.query || {};
      return queryDependencies(env, "new_dependency", filter, limit, timespan);
    },
    byQuery: (_parent: CustomEvents, args: DependenciesByQueryArgs, context: any) => {
      const env: Env = context["env"];
      const { filter, limit, timespan } = args.query || {};
      return queryDependencies(env, "dependencies", filter, limit, timespan);
    },
  },
  SmtLogs: {
    allLogs(_: any, args: SmtLogsAllLogsArgs) {
      const { filter, limit } = args.query || {}
      return querySmtLog(filter, limit);
    },
    byRequestId(_:any, args: { requestId: string}) {
      return getSmtLog(args.requestId)
    }
  },
  SmtLog: {
    async responseBodyDecoded(parent: SmtLog, args: SmtLogResponseBodyDecodedArgs) {
      const body = parent.responseBody;
      if (body) {
        let str = body.trim();
        if (str.endsWith("=")){
          str = await decode(str);
        } else if (str.endsWith("[truncated]")){
          return {
            error: "truncated json",
            raw: args.showRaw ? str : undefined
          }
        }
        try {
          return JSON.parse(str);
        } catch(e) {
          return {
            error: e,
            raw: args.showRaw ? str : undefined
          }
        }
      }
    },
    async argumentsDecoded(parent: SmtLog) {
      const args = (parent.arguments || "").split(";").map(s => s.trim());
      const result = {};
      for (const arg of args) {
        const idx = arg.indexOf("=");
        if(idx >=0 ) {
          const key = arg.slice(0, idx).trim();
          const value = arg.slice(idx+1).trim();
          if(value.startsWith("\"") && value.endsWith("\"")) {
            result[key] = value.slice(1, -1)
          } else if (value.endsWith("=")) {
            const str = await decode(value);
            try {
              result[key] = JSON.parse(str);  
            } catch (error) {
              result[key]= {
                error,
                raw: str
              }
            }
          }
        }
      }
      return result;
    }
  },
  CustomEvents: {
    byScenario(parent: CustomEvents, args: CustomEventsByScenarioArgs, context: any) {
      const env: Env = context["env"];
      const extension = args.extension || "visual-interface";
      const filters = ['where customDimensions.type == "scenario"'];
      if (extension) {
        filters.push(`where customDimensions.Extension == "${extension}"`);
      }
      if (args.scenario) {
        filters.push(`customDimensions.scenarioType == \"${args.scenario}\"`);
      }
      if (args.query && args.query.filter) {
        filters.join(args.query.filter);
      }
      return queryCustomEvents(
        env,
        filters.join(" | "),
        args.query && args.query.limit,
        args.query && args.query.timespan
      );
    },
    byQuery: (_parent: CustomEvents, args: CustomEventsByQueryArgs, context: any) => {
      const env: Env = context["env"];
      if (args.query) {
        const { filter, limit, timespan } = args.query;
        return queryCustomEvents(env, filter, limit, timespan);
      }
      return queryCustomEvents(env);
    },
  },
  UserErrors: {
    byQuery: (parent: CustomEvents, args: CustomEventsByQueryArgs, context: any) => {
      const env: Env = context["env"];
      const { filter, limit, timespan } = args.query || {};
      return queryUserErrors(env, filter, limit, timespan);
    },
    byExtension: (parent: CustomEvents, args: UserErrorsByExtensionArgs, context: any) => {
      const env: Env = context["env"];
      const extensions = args.extensions || [];
    
      let q = `
      let row= dynamic('');
      let dimensionVal= row.Dimension;
      let msg= dynamic('').errorCode;
      userErrors
      | where timestamp > ago(1d)
      | where client_Browser !startswith "HeadlessChrome"
      | extend extensionName=tostring(customDimensions.Extension)
      | extend route= tostring(customDimensions.Route)
      | extend errorCode = tostring(customDimensions.errorCode)
      | extend subscription=replace("-", "", tostring(customDimensions.Subscription))
      | where subscription !in (dev_subscriptions) \n`;
      if (extensions.length > 0) {
        const str = extensions.map(e => `'${e}'`).join(",");
        q += `| where extensionName in (${str}) or '*' in (${str}) \n`
      }
      q+= `| where extensionName == dimensionVal or row==''
      | where  errorCode== msg
      `
      return executeCustomEventsQuery(env, q);
    }
  },
  DependencyCustomDimension: {
    request(parent: DependencyCustomDimension) {
      if(parent && parent.requestId) {
        return getSmtLog(parent.requestId)
      }
    }
  },
  CustomEvent: {
    dependencies(parent: CustomEvent, args: CustomEventDependenciesArgs, context: any) {
      if (parent.customDimensions) {
        const { sessionId, operationId, customDimensions } = parent;
        const filter = `
         where success==${args.success ? 'true' : 'false'}
        | extend extensionName=tostring(customDimensions.Extension)
        | extend route= tostring(customDimensions.Route)
        | extend subscription=replace("-", "", tostring(customDimensions.Subscription))
        | where subscription !in (dev_subscriptions)
        | where session_Id == '${sessionId || customDimensions.SessionId}'
        | where operation_Id == '${operationId}'
        | where client_Browser !startswith "HeadlessChrome"
        `
        return queryDependencies(context.env, "new_dependency", filter);
      }
    }
  }
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  context: () => {
    return {};
  },
});

const handler = apolloServer.createHandler({ path: "/api/graphql" });

export const config = {
  api: {
    bodyParser: false,
  },
};

const cors = Cors({
  allowMethods: ["GET", "POST", "OPTIONS"],
});

export default cors(handler);
