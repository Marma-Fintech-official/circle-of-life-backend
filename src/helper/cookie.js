const NODE_ENV = "development"; // change to "production" when deploying
const isProduction = NODE_ENV === "production";

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: isProduction,                // true only in production (https)
  sameSite: isProduction ? "strict" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,    // 7 days in milliseconds
};

export default COOKIE_OPTIONS;
