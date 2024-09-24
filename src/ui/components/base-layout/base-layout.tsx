import type { PropsWithChildren } from "react";
import React, { Suspense } from "react";
import css from "./base-layout.css";
import LoginButton from "@/src/ui/features/misc/containers/login-button/login-button";
import { Link } from "@/src/ui/i18n";

function ListElement(props: { href: string; label: string }) {
  return (
    <li className={css.li}>
      <Link href={props.href}>{props.label}</Link>
    </li>
  );
}

export const BaseLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className={css.wrapper}>
      <nav className={css.nav}>
        <ul className={css.ul}>
          <ListElement href="/" label="home" />
          <ListElement href="/users_provider" label="users (with zustand provider)" />
          <ListElement href="/users" label="users" />
          <ListElement href="/create-post" label="create post" />
          <ListElement href="/posts" label="list post" />
        </ul>
        <Suspense>
          <LoginButton />
        </Suspense>
      </nav>
      <main className={css.main}>{children}</main>
      <footer className={css.footer}>cool footer</footer>
    </div>
  );
};
