import Link from "next/link";
import type { PropsWithChildren } from "react";
import Styled from "@/src/ui/components/base_layout/base_layout.styled";
import { Button } from "@/src/ui/components/button/button";
import { getLoggedState, loginThunk, logoutThunk, setLogged } from "@/src/ui/state/user.slice";
import { useAppDispatch } from "@/src/ui/state";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { LoggingModal } from "@/src/ui/components/logging_modal/logging_modal";
import { CookieUtils } from "@front_web_mrmilu/utils";
import { useUiProvider } from "@/src/ui/providers/ui.provider";

export const BaseLayout = ({ children }: PropsWithChildren<{ logged?: boolean }>) => {
  const showModal = useUiProvider((state) => state.showModal);
  const dispatch = useAppDispatch();
  const isUserLogged = useSelector(getLoggedState);
  const router = useRouter();

  useEffect(() => {
    if (router.query.protectedRouteAccessAttempt) {
      showModal(<LoggingModal />)
    }
  }, [dispatch, router.query, showModal]);

  useEffect(() => {
    const logged = CookieUtils.getCookie("logged");
    dispatch(setLogged(logged === "true"));
  }, [dispatch]);

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
            <Link href="/users">users</Link>
          </li>
          <li>
            <Link href="/users_ssr">users SSR</Link>
          </li>
          <li>
            <Link href="/create_post">create post</Link>
          </li>
          <li>
            <Link href="/posts_ssr">list post</Link>
          </li>
        </ul>
        <Button onClick={ isUserLogged ? logout : login }>{ isUserLogged ? "Log out" : "Log in" }</Button>
      </Styled.Nav>
      <main>{ children }</main>
      <Styled.Footer>cool footer</Styled.Footer>
    </Styled.Wrapper>
  );
};
