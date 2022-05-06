import styled from "styled-components";
import { px2rem } from "@/src/ui/styles/utils";

export const CarouselPageStyled = styled.div`
  width: 100%;
  max-width: ${px2rem(800)};
  margin: ${px2rem(40)} auto;
`;

export const CarouselSlideStyled = styled.article`
  height: ${px2rem(500)};
  background-color: white;
`;
