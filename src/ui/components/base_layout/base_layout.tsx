import Link from "next/link";
import type { PropsWithChildren } from "react";
import React from "react";
import css from "./base_layout.css";
import LoginButton from "@/src/ui/features/misc/containers/login_button/login_button";

function ListElement(props: { href: string; label: string }) {
  return (
    <li className={css.li}>
      <Link href={props.href}>{props.label}</Link>
    </li>
  );
}

export const BaseLayout = ({ children, lng }: PropsWithChildren<{ lng: string }>) => {
  return (
    <div className={css.wrapper}>
      <nav className={css.nav}>
        <ul className={css.ul}>
          <ListElement href={`/${lng}`} label="home" />
          <ListElement href={`/${lng}/users_provider`} label="users (with zustand provider)" />
          <ListElement href={`/${lng}/users`} label="users" />
          <ListElement href={`/${lng}/create_post`} label="create post" />
          <ListElement href={`/${lng}/posts`} label="list post" />
        </ul>
        <LoginButton />
      </nav>
      <main className={css.main}>{children}</main>
      <footer className={css.footer}>cool footer</footer>
    </div>
  );
};
