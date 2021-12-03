const path = require("path");

module.exports = {
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"]
  },
  localePath: path.resolve("./public/assets/locales"),
  defaultNS: "home"
};
