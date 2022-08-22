import { Flipside, Query, QueryResultSet } from "@flipsidecrypto/sdk";

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

  if (result.error) {
    console.log(result.error);
  }
  return result.error ? [[]] : result.records;
};
