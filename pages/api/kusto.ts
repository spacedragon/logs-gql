import { querySmtLog } from "../../lib/kusto";

export default async (req, res) => {
     const results = await querySmtLog();
     res.json(results);
}
