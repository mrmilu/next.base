import Link from "next/link";
import type { PropsWithChildren } from "react";
import { Button } from "@/src/ui/components/button/button";
import { useUserProvider } from "@/src/ui/providers/user.provider";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { LoggingModal } from "@/src/ui/components/logging_modal/logging_modal";
import { CookieUtils } from "@front_web_mrmilu/utils";
import { useUiProvider } from "@/src/ui/providers/ui.provider";
import css from "./base_layout.css";

function ListElement(props: { href: string; label: string }) {
  return (
    <li className={css.li}>
      <Link href={props.href}>{props.label}</Link>
    </li>
  );
}

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
    <div className={css.wrapper}>
      <nav className={css.nav}>
        <ul className={css.ul}>
          <ListElement href="/" label="home" />
          <ListElement href="/users_provider" label="users (with zustand provider)" />
          <ListElement href="/users" label="users" />
          <ListElement href="/create_post" label="create post" />
          <ListElement href="/posts" label="list post" />
        </ul>
        <Button onClick={isUserLogged ? logout : login}>{isUserLogged ? "Log out" : "Log in"}</Button>
      </nav>
      <main className={css.main}>{children}</main>
      <footer className={css.footer}>cool footer</footer>
    </div>
  );
};
