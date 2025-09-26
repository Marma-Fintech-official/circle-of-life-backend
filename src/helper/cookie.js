const NODE_ENV = "development"; // change to "production" when deploying
const isProduction = NODE_ENV === "production";

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: isProduction,                // true only in production (https)
  sameSite: isProduction ? "strict" : "lax",
};

export default COOKIE_OPTIONS;
