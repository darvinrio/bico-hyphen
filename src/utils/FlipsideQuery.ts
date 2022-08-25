import { Flipside, Query, QueryResultSet, QueryRunExecutionError } from "@flipsidecrypto/sdk";

const flipside = new Flipside(
  process.env.NEXT_PUBLIC_FLIPSIDE_SHROOM_KEY as string,
  "https://node-api.flipsidecrypto.com"
);

export const queryFlipside = async (sql: string) => {
  const query: Query = {
    sql: sql,
    ttlMinutes: 10,
  };

  const result: QueryResultSet = await flipside.query.run(query);

  let error = false
  if (result.error) {
    console.log(result.error);
    error = true
  }
  // return result.error ? [[]] : result.records;
  return  {
    data: result.records,
    // error: result.error
    error: error
  }
};
