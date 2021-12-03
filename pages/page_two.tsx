import styles from "./Home.module.scss";
import { ReactElement, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/src/ui/state";
import { getUsers, getUsersThunk } from "@/src/ui/features/dummy/state/dummy.slice";
import { MyBaseLayout } from "@/src/ui/components/my_base_layout/my_base_layout";
import { GetServerSideProps, GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function PageTwo() {
  const dispatch = useAppDispatch();
  const users = useAppSelector(getUsers);

  useEffect(() => {
    dispatch(getUsersThunk());
  }, [dispatch]);

  return (
    <div className={styles["next-base"]}>
      <ul>
        {users.map((user, idx) => (
          <li key={`${user.id}_${idx}`}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

PageTwo.getLayout = function getLayout(page: ReactElement) {
  return <MyBaseLayout>{page}</MyBaseLayout>;
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const fakeTimeout = () => new Promise<void>((resolve) => setTimeout(() => resolve(), 400));
  await fakeTimeout();
  return {
    props: {
      ...(await serverSideTranslations(locale || "en"))
      // Will be passed to the page component as props
    }
  };
};
