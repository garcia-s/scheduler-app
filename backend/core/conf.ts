const DEV_PORT = 5050;

export const PORT =
  process.env.NODE_ENV === "production" ? process.env.PORT : DEV_PORT;
