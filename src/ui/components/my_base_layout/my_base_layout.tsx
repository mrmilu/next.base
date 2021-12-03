import styles from "./my_base_layout.module.scss";
import { WithChildren } from "@/src/ui/view_models/base_props";
import Link from "next/link";

type MyBaseLayoutProps = WithChildren;

export const MyBaseLayout = ({ children }: MyBaseLayoutProps) => {
  return (
    <div className={styles["my-base-layout"]}>
      <nav>
        <ul>
          <li>
            <Link href="/">home</Link>
          </li>
          <li>
            <Link href="/page_two">dummy</Link>
          </li>
        </ul>
      </nav>
      <main>{children}</main>
      <footer>cool footer</footer>
    </div>
  );
};
