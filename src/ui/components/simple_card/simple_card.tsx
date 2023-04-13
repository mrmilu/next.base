import Styled from "@/src/ui/components/simple_card/simple_card.styled";
import type { MouseEventHandler } from "react";

export interface SimpleCardProps {
  title: string;
  subtitle: string;
  className?: string;
  onClick?: MouseEventHandler;
}

export const SimpleCard = ({ title, subtitle, className, onClick }: SimpleCardProps) => {
  return (
    <Styled.Wrapper onClick={onClick} className={className}>
      <Styled.Avatar />
      <Styled.Content>
        <h4>{title}</h4>
        <p>{subtitle}</p>
      </Styled.Content>
    </Styled.Wrapper>
  );
};
