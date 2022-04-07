import Link from "next/link";
import type { PropsWithChildren } from "react";
import { BaseLayoutFooterStyled, BaseLayoutNavStyled, BaseLayoutStyled } from "@/src/ui/components/base_layout/base_layout.styled";
import { Button } from "@/src/ui/components/button/button";
import { getLoggedState, loginThunk, logoutThunk } from "@/src/ui/state/user.slice";
import { useAppDispatch } from "@/src/ui/state";
import { useSelector } from "react-redux";

export const BaseLayout = ({ children }: PropsWithChildren<unknown>) => {
  const dispatch = useAppDispatch();
  const userLogged = useSelector(getLoggedState);

  const login = () => {
    dispatch(loginThunk());
  };

  const logout = () => {
    dispatch(logoutThunk());
  };

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
          <li>
            <Link href="/posts_ssr">list post</Link>
          </li>
        </ul>
        <Button onClick={userLogged ? logout : login}>{userLogged ? "Log out" : "Log in"}</Button>
      </BaseLayoutNavStyled>
      <main>{children}</main>
      <BaseLayoutFooterStyled>cool footer</BaseLayoutFooterStyled>
    </BaseLayoutStyled>
  );
};
