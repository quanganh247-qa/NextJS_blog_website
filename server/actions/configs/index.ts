export const getDomain = (mode: "local" | "production" = "local") => {
  if (mode === "local") {
    return "http://localhost:8000";
  }
  return "https://your-production-domain.com";
};
