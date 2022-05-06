import styled from "styled-components";
import type { SimpleCardProps } from "@/src/ui/components/simple_card/simple_card";
import { SimpleCard } from "@/src/ui/components/simple_card/simple_card";
import { px2rem } from "@/src/ui/styles/utils";

export const InfiniteScrollPageSimpleCardStyled = styled(SimpleCard)<SimpleCardProps>`
  p {
    overflow: auto;
  }
  margin: ${px2rem(20)} ${px2rem(16)};
`;
