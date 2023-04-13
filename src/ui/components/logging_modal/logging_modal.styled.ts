import styled from "styled-components";
import { colors } from "../../styles/colors";
import { spacing } from "../../styles/spacing";
import { px2rem } from "../../styles/utils";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.white};
  padding: ${px2rem(spacing.size6)};
`;

const LoggingModalStyled = {
  Wrapper
};

export default LoggingModalStyled;
