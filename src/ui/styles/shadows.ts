import { css } from "styled-components";
import { px2rem } from "@/src/ui/styles/utils";
import type { NoInfer, RuleSet } from "styled-components/dist/types";

export type shadowsType = "one";

export const shadows: Record<shadowsType, RuleSet<NoInfer<object>>> = {
  one: css`0 ${px2rem(4)} ${px2rem(16)} 0 rgb(0 0 0 / 20%);`
};
