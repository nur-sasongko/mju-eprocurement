import PATHS from "@/shared/utils/routes";

export const hasEnvVars =
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function getProtectedPatterns() {
  const patterns: (string | RegExp)[] = [];

  for (const key of Object.keys(PATHS.PROTECTED) as Array<keyof typeof PATHS.PROTECTED>) {
    const route = PATHS.PROTECTED[key];
    if (typeof route === "string") {
      patterns.push(route);
    } else if (typeof route === "function") {
      // build regex from function pattern, e.g. /dashboard/mail/incoming/detail/:id
      // extract the template and replace param with regex
      const fnStr = route.toString();
      // e.g. (id) => `/dashboard/mail/incoming/detail/${id}`
      // extract the template string
      const match = fnStr.match(/`([^`]*)`/);
      if (match) {
        let template = match[1];
        // replace ${id} with ([^/]+)
        template = template.replace(/\$\{[^}]+\}/g, "([^/]+)");
        patterns.push(new RegExp(`^${template}$`));
      }
    }
  }
  return patterns;
}

export function matchProtected(pathname: string) {
  const patterns = getProtectedPatterns();
  return patterns.some((pattern) => {
    if (typeof pattern === "string") return pattern === pathname;
    if (pattern instanceof RegExp) return pattern.test(pathname);
    return false;
  });
}

export function getPublicPatterns() {
  // Public routes are all strings
  return Object.values(PATHS.PUBLIC) as string[];
}
