
const DEV_PORT = 5000;

export const PORT =
  process.env.NODE_ENV === "production" ? process.env.PORT : DEV_PORT;


