import { Client, KustoConnectionStringBuilder, ClientRequestProperties  } from 'azure-kusto-data';
import dotnet from 'dotenv';
import { HttpResponseError } from './error';
import { SmtLog } from './types';
dotnet.config()
const clusterName = "Viennatest";
const appId = process.env.NEXT_PUBLIC_APP_ID
const appKey = process.env.APP_PASSWORD;
const authorityId = process.env.NEXT_PUBLIC_AUTHORITY_Id;


export function querySmtLog( filter?: string, limit: number = 100) {
    const clientRequestProps = new ClientRequestProperties();
    clientRequestProps.setTimeout(1000 * 60);
    clientRequestProps.setOption("norequesttimeout", true);
    clientRequestProps.setOption("notruncation", true);
    clientRequestProps.setOption("request_readonly", true);
    clientRequestProps.setOption("deferpartialqueryfailures ", false);
    clientRequestProps.setOption("queryconsistency  ", "normalconsistency");
    const kcs = KustoConnectionStringBuilder.withAadApplicationKeyAuthentication(`https://${clusterName}.kusto.windows.net`, appId, appKey, authorityId);
    const kustoClient = new Client(kcs);
    return new Promise<SmtLog[]>( (resolve, reject) => {
        const query = `UnionOfAllLogs(@'DesignerApiTelemetry') ${filter ? '| '+ filter : ''} | limit ${limit}`;
        kustoClient.execute("Vienna", query, (err, results) => {
            if (err) {
                reject(new HttpResponseError(500,  JSON.stringify(err)));
            } else {
                const result = results.primaryResults[0];
                const rows = Promise.all(result.rows());
                rows.then(rows => {
                    resolve(rows.map(toSmtLog));
                })
            };
        }, clientRequestProps);
    });
}

export async function getSmtLog(id: string): Promise<SmtLog[]> {
    const logs = await querySmtLog(`where RequestId=="${id}"`)   
    return logs
}

function toSmtLog(row: Client.KustoResultRow<any>): SmtLog {
    return row
}
