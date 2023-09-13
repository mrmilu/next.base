import { css } from "styled-components";
import type { NoInfer, RuleSet } from "styled-components/dist/types";

export const breakpoints: Record<BreakpointTypes, number> = {
  sm: 480,
  md: 768,
  lg: 1024
};

export type BreakpointTypes = "sm" | "md" | "lg";
export const includeMedia = (type: BreakpointTypes, styles: RuleSet<NoInfer<object>>) => css`
  @media (min-width: ${breakpoints[type]}px) {
    ${styles}
  }
`;
