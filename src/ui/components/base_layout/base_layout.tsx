import Link from "next/link";
import { PropsWithChildren } from "react";
import { BaseLayoutFooterStyled, BaseLayoutNavStyled, BaseLayoutStyled } from "@/src/ui/components/base_layout/base_layout.styled";

export const BaseLayout = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <BaseLayoutStyled>
      <BaseLayoutNavStyled>
        <ul>
          <li>
            <Link href="/">home</Link>
          </li>
          <li>
            <Link href="/dummy">dummy</Link>
          </li>
          <li>
            <Link href="/dummy_ssr">dummy SSR</Link>
          </li>
          <li>
            <Link href="/create_post">create post</Link>
          </li>
        </ul>
      </BaseLayoutNavStyled>
      <main>{children}</main>
      <BaseLayoutFooterStyled>cool footer</BaseLayoutFooterStyled>
    </BaseLayoutStyled>
  );
};
