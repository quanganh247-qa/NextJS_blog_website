// const getRoutesAuth = (mode: "local" | "production" = "local") => ({
//   SIGN_UP: `http://127.0.0.1/api/auth/register`,
//   SIGN_IN: `${getDomain(mode)}/api/auth/login`,
// });

import { getDomain } from "../configs";

// const getRoutesAuth = (mode: "local" | "production" = "local") => ({
//   SIGN_UP: `${getDomain(mode)}/api/auth/register`,
//   SIGN_IN: `${getDomain(mode)}/api/auth/login`,
// });

// export default getRoutesAuth;

export const getRoutesAuth = () => ({
  SIGN_UP: `http://127.0.0.1:8000/api/auth/register`,
  SIGN_IN: `http://127.0.0.1:8000/api/auth/login`,
});
