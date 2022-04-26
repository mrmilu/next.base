import styled from "styled-components";
import type { SimpleCardProps } from "@/src/ui/components/simple_card/simple_card";
import { SimpleCard } from "@/src/ui/components/simple_card/simple_card";

export const InfiniteScrollPageSimpleCardStyled = styled(SimpleCard)<SimpleCardProps>`
  p {
    overflow: auto;
  }
  margin: 20px 16px;
`;
