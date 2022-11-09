import Link from "next/link";
import type { PropsWithChildren } from "react";
import Styled from "@/src/ui/components/base_layout/base_layout.styled";
import { Button } from "@/src/ui/components/button/button";
import { getLoggedState, loginThunk, logoutThunk } from "@/src/ui/state/user.slice";
import { useAppDispatch } from "@/src/ui/state";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import React, { useEffect, useMemo } from "react";
import { showModal } from "@/src/ui/state/ui.slice";
import { LoggingModal } from "@/src/ui/components/logging_modal/logging_modal";

export const BaseLayout = ({ children, logged }: PropsWithChildren<{ logged?: boolean }>) => {
  const dispatch = useAppDispatch();
  const userLogged = useSelector(getLoggedState);
  const router = useRouter();
  const isUserLogged = useMemo(() => !userLogged && logged !== undefined && logged, [logged, userLogged]);

  useEffect(() => {
    if (router.query.protectedRouteAccessAttempt) {
      dispatch(showModal(<LoggingModal />));
    }
  }, [dispatch, router.query]);

  const login = () => {
    dispatch(loginThunk());
  };

  const logout = () => {
    dispatch(logoutThunk());
  };

  return (
    <Styled.Wrapper>
      <Styled.Nav>
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
        <Button onClick={isUserLogged ? logout : login}>{isUserLogged ? "Log out" : "Log in"}</Button>
      </Styled.Nav>
      <main>{children}</main>
      <Styled.Footer>cool footer</Styled.Footer>
    </Styled.Wrapper>
  );
};
