import { css } from "styled-components";
import { px2rem } from "./utils";
import type { NoInfer, RuleSet } from "styled-components/dist/types";

export interface Typography {
  bodyXs: RuleSet<NoInfer<object>>;
  bodyS: RuleSet<NoInfer<object>>;
  bodyM: RuleSet<NoInfer<object>>;
  bodyL: RuleSet<NoInfer<object>>;
  subHeading: RuleSet<NoInfer<object>>;
  headingS: RuleSet<NoInfer<object>>;
  headingM: RuleSet<NoInfer<object>>;
  headingL: RuleSet<NoInfer<object>>;
}

declare type FontType = "Lato";

export const fonts: Record<FontType, RuleSet<NoInfer<object>>> = {
  Lato: css`
    font-family: "Lato", sans-serif;

    * {
      font-family: "Lato", sans-serif;
    }
  `
};

// Body
const bodyXs = css`
  ${fonts.Lato};
  font-size: ${px2rem(12)};
  line-height: ${px2rem(14)};
  font-weight: 400;
`;
const bodyS = css`
  ${fonts.Lato};
  font-size: ${px2rem(14)};
  line-height: ${px2rem(18)};
  font-weight: 400;
`;
const bodyM = css`
  ${fonts.Lato};
  font-size: ${px2rem(16)};
  line-height: ${px2rem(20)};
  font-weight: 400;
`;
const bodyL = css`
  ${fonts.Lato};
  font-size: ${px2rem(24)};
  line-height: ${px2rem(28)};
  font-weight: 400;
`;

// Heading
const subHeading = css`
  ${fonts.Lato};
  font-size: ${px2rem(26)};
  line-height: ${px2rem(30)};
  font-weight: 400;
`;
const headingS = css`
  ${fonts.Lato};
  font-size: ${px2rem(32)};
  line-height: ${px2rem(36)};
  letter-spacing: ${px2rem(-0.32)};
  font-weight: 300;
`;
const headingM = css`
  ${fonts.Lato};
  font-size: ${px2rem(56)};
  line-height: ${px2rem(52)};
  letter-spacing: ${px2rem(-0.56)};
  font-weight: 300;
`;
const headingL = css`
  ${fonts.Lato};
  font-size: ${px2rem(72)};
  line-height: ${px2rem(68)};
  letter-spacing: ${px2rem(-1.44)};
  font-weight: 300;
`;

export const typography: Typography = {
  bodyXs,
  bodyS,
  bodyM,
  bodyL,
  subHeading,
  headingS,
  headingM,
  headingL
};
