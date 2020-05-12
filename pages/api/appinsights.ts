import { ApplicationInsightsDataClient } from '@azure/applicationinsights-query';
import { BasicAuthenticationCredentials } from "@azure/ms-rest-js";
import dotenv from "dotenv";
import { NextApiRequest, NextApiResponse } from 'next'

dotenv.config();

const appId = process.env.TEST_INSIGHTS_API_ID
const appKey = process.env.TEST_INSIGHTS_API_KEY

export default (_req: NextApiRequest, res: NextApiResponse) => {
    res.statusCode = 200
    const creds = new BasicAuthenticationCredentials(appKey, "");
    const client = new ApplicationInsightsDataClient(creds);
    const query = {
        query: "customEvents | limit 1",
        timespan: "P1D"
    }
    client.query.execute(appId, query).then(result => {
        if(result._response.status === 200 ) {
            res.json(result.tables)
        } else {
            res.status(result._response.status).send(result._response.bodyAsText)
        }
    })
}
