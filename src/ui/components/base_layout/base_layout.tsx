import type { PropsWithChildren } from "react";
import React from "react";
import css from "./base_layout.css";
import LoginButton from "@/src/ui/features/misc/containers/login_button/login_button";
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
          <ListElement href="/create_post" label="create post" />
          <ListElement href="/posts" label="list post" />
        </ul>
        <LoginButton />
      </nav>
      <main className={css.main}>{children}</main>
      <footer className={css.footer}>cool footer</footer>
    </div>
  );
};
