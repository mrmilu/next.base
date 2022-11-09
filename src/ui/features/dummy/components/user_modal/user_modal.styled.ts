import styled from "styled-components";
import { ModalContent } from "@/src/ui/components/modal/modal";
import { colors } from "@/src/ui/styles/colors";

const Wrapper = styled.div<{ id: string }>`
  background-color: ${(props) => (Number(props.id) % 2 ? colors.gray10 : colors.gray40)};
`;

const Content = styled(ModalContent)`
  display: flex;
  flex-direction: column;
`;

const UserModalStyled = {
  Wrapper,
  Content
};

export default UserModalStyled;
