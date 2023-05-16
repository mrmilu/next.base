import Link from "next/link";
import type { PropsWithChildren } from "react";
import Styled from "@/src/ui/components/base_layout/base_layout.styled";
import { Button } from "@/src/ui/components/button/button";
import { useUserProvider } from "@/src/ui/providers/user.provider";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { LoggingModal } from "@/src/ui/components/logging_modal/logging_modal";
import { CookieUtils } from "@front_web_mrmilu/utils";
import { useUiProvider } from "@/src/ui/providers/ui.provider";

export const BaseLayout = ({ children }: PropsWithChildren<{ logged?: boolean }>) => {
  const setLogged = useUserProvider((state) => state.setLogged);
  const login = useUserProvider((state) => state.login);
  const logout = useUserProvider((state) => state.logout);
  const isUserLogged = useUserProvider((state) => state.logged);
  const showModal = useUiProvider((state) => state.showModal);
  const router = useRouter();

  useEffect(() => {
    if (router.query.protectedRouteAccessAttempt) {
      showModal(<LoggingModal />);
    }
  }, [router.query, showModal]);

  useEffect(() => {
    const logged = CookieUtils.getCookie("logged");
    setLogged(logged === "true");
  }, [setLogged]);

  return (
    <Styled.Wrapper>
      <Styled.Nav>
        <ul>
          <li>
            <Link href="/">home</Link>
          </li>
          <li>
            <Link href="/users_provider">users (with zustand provider)</Link>
          </li>
          <li>
            <Link href="/users">users</Link>
          </li>
          <li>
            <Link href="/create_post">create post</Link>
          </li>
          <li>
            <Link href="/posts">list post</Link>
          </li>
        </ul>
        <Button onClick={isUserLogged ? logout : login}>{isUserLogged ? "Log out" : "Log in"}</Button>
      </Styled.Nav>
      <main>{children}</main>
      <Styled.Footer>cool footer</Styled.Footer>
    </Styled.Wrapper>
  );
};
