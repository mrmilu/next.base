import styled from "styled-components";
import { px2rem, wrapperStyles } from "@/src/ui/styles/utils";
import { spacing } from "@/src/ui/styles/spacing";
import { LoaderStyled } from "@/src/ui/components/loader/loader.styled";

export const DummyPageStyled = styled.div`
  ${wrapperStyles};
  display: flex;
  flex-direction: column;
  gap: ${px2rem(spacing.size6)};
  padding: ${px2rem(spacing.size4)};

  > ${LoaderStyled} {
    align-self: center;
  }
`;
