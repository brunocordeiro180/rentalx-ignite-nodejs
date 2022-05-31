import { Connection, createConnection, getConnectionOptions } from "typeorm";

interface IOptions {
  host: string;
}

getConnectionOptions().then((options) => {
  const newOptions = options as IOptions;
  newOptions.host = process.env.NODE_ENV === "test" ? "localhost": "database-ignite";
  createConnection({
    ...options,
  });
});

export default async (host = "database-ignite"): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();
  return createConnection(
    Object.assign(defaultOptions, {
      host: process.env.NODE_ENV === "test" ? "localhost": host,
      database: process.env.NODE_ENV === "test" ? "rentalx_test" : "rentalx",
    })
  );
};
