module.exports = {
  extends: ["stylelint-config-standard", "stylelint-config-prettier"],
  customSyntax: "@stylelint/postcss-css-in-js",
  rules: {
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["global"]
      }
    ]
  }
};
