import { SimpleCardStyled, SimpleCardAvatarStyled, SimpleCardStyledContent } from "@/src/ui/components/simple_card/simple_card.styled";

export interface SimpleCardProps {
  title: string;
  subtitle: string;
}

export const SimpleCard = (props: SimpleCardProps) => {
  return (
    <SimpleCardStyled>
      <SimpleCardAvatarStyled />
      <SimpleCardStyledContent>
        <h4>{props.title}</h4>
        <p>{props.subtitle}</p>
      </SimpleCardStyledContent>
    </SimpleCardStyled>
  );
};
