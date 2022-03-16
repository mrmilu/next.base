import styled, { css } from "styled-components";
import { Form } from "formik";
import { px2rem, wrapperStyles } from "@/src/ui/styles/utils";
import { colors } from "@/src/ui/styles/colors";
import { spacing } from "@/src/ui/styles/spacing";
import { includeMedia } from "@/src/ui/styles/breakpoints";

export const HomePageStyled = styled.div`
  ${wrapperStyles};
  display: flex;
  flex-direction: column;
  background-color: ${colors.white};
  padding: ${px2rem(spacing.size4)};
  border-radius: ${px2rem(4)};
  gap: ${px2rem(spacing.size2)};
`;

export const HomeFormStyled = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: ${px2rem(spacing.size4)};
`;

export const HomePageLocaleStyled = styled.div`
  display: flex;
  align-items: center;
  margin: ${px2rem(spacing.size4)} 0;
  gap: ${px2rem(spacing.size4)};
`;