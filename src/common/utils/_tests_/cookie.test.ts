import { CookieUtils } from "../cookie";

describe("Cookies tests", () => {
  describe("getCookie tests", () => {
    // Applies only to tests in this describe block
    beforeEach(() => {
      Object.defineProperty(document, "cookie", {
        writable: true,
        value: "example1=one;example2=two"
      });
    });

    test("cookie value should be one", () => {
      const expected = "one";
      const result = CookieUtils.getCookie("example1");

      expect(result).toBe(expected);
    });
    test("cookie value should be null", () => {
      const result = CookieUtils.getCookie("example3");

      expect(result).toBeNull();
    });
  });

  describe("setCookie tests", () => {
    test("setCookie should set cookie in document", () => {
      const expected = "customCookie=customValue";
      CookieUtils.setCookie("customCookie", "customValue");

      expect(document.cookie).toContain(expected);
    });
  });

  describe("eraseCookie tests", () => {
    test("eraseCookie should set cookie in document", () => {
      const value = "customCookie";
      const staticValue = "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      const expected = value + staticValue;

      CookieUtils.eraseCookie("customCookie");

      expect(document.cookie).toBe(expected);
    });
  });
});
