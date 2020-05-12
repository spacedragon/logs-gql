const msRestNodeAuth = require("@azure/ms-rest-nodeauth");
const ApplicationInsightsDataClient = require("@azure/applicationinsights-query").ApplicationInsightsDataClient;
 
msRestNodeAuth.interactiveLogin().then((creds) => {
  const client = new ApplicationInsightsDataClient(creds);
  const appId = "vienna-westus2";
  
  client.query.execute(appId, {
      query:"set query_take_max_records=10;set truncationmaxsize=67108864;\ntraces ",
      timespan: "P1D"
  }).then(results => {
      console.log(results);
  })
}).catch((err) => {
  console.error(err);
});