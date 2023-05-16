import { typographyConfig } from "@/src/ui/styles/typography";
import { px2rem } from "@/src/ui/styles/utils";
import { globalStyle } from "@vanilla-extract/css";
import { vars } from "@/src/ui/styles/theme.css";
import { latoFontFamily } from "@/src/ui/styles/fonts";

globalStyle("body", {
  backgroundColor: vars.colors.gray10
});

globalStyle("*", {
  fontFamily: latoFontFamily
});

globalStyle("* > :focus", {
  outline: `${px2rem(2)} solid ${vars.colors.gray40}`
});

globalStyle("h1", typographyConfig.headingL);
globalStyle("h2", typographyConfig.headingM);
globalStyle("h3", typographyConfig.headingS);
globalStyle("h4", typographyConfig.subHeading);
globalStyle("p", typographyConfig.bodyM);
globalStyle("small", typographyConfig.bodyXs);
