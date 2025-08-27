import PATHS from "@/shared/utils/routes";
import { getProtectedPatterns, matchProtected } from "../utils";

describe("getProtectedPatterns", () => {
  it("should return string and RegExp patterns for protected routes", () => {
    const patterns = getProtectedPatterns();

    // Strings
    expect(patterns).toContain(PATHS.PROTECTED.DASHBOARD);
    expect(patterns).toContain(PATHS.PROTECTED.MAIL_INCOMING);

    // RegExp for function route (detail)
    const detailPattern = patterns.find(
      (p) =>
        p instanceof RegExp && p.test("/dashboard/mail/incoming/detail/123")
    );
    expect(detailPattern).toBeInstanceOf(RegExp);
    expect(
      detailPattern instanceof RegExp &&
        detailPattern.test("/dashboard/mail/incoming/detail/456")
    ).toBe(true);
  });
});

describe("matchProtected", () => {
  it("should match static protected routes", () => {
    expect(matchProtected("/dashboard")).toBe(true);
    expect(matchProtected("/dashboard/mail/incoming")).toBe(true);
    expect(matchProtected("/dashboard/mail/outgoing")).toBe(true);
    expect(matchProtected("/dashboard/mail/incoming/form")).toBe(true);
    expect(matchProtected("/dashboard/mail/outgoing/form")).toBe(true);
    expect(matchProtected("/dashboard/user")).toBe(true);
    expect(matchProtected("/auth/logout")).toBe(true);
    expect(matchProtected("/not-a-protected-route")).toBe(false);
  });

  it("should match dynamic protected routes (detail/edit)", () => {
    expect(matchProtected("/dashboard/mail/incoming/detail/1")).toBe(true);
    expect(matchProtected("/dashboard/mail/incoming/detail/999")).toBe(true);
    expect(matchProtected("/dashboard/mail/incoming/form/123")).toBe(true);
    expect(matchProtected("/dashboard/mail/outgoing/detail/222")).toBe(true);
    expect(matchProtected("/dashboard/mail/outgoing/form/15")).toBe(true);
    expect(matchProtected("/dashboard/mail/outgoing/form/")).toBe(false); // trailing slash and no id
    expect(matchProtected("/dashboard/mail/incoming/detail/")).toBe(false);
    expect(matchProtected("/dashboard/mail/outgoing/detail/abc")).toBe(true); // id can be any string
  });
});
