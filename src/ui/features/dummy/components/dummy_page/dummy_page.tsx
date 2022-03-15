import { ReactElement, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/src/ui/state";
import { getUsers, getUsersThunk } from "@/src/ui/features/dummy/state/dummy.slice";
import { BaseLayout } from "@/src/ui/components/base_layout/base_layout";
import { DummyPageStyled } from "@/src/ui/features/dummy/components/dummy_page/dummy_page.styled";

export default function DummyPage() {
  const dispatch = useAppDispatch();
  const users = useAppSelector(getUsers);

  useEffect(() => {
    dispatch(getUsersThunk());
  }, [dispatch]);

  return (
    <DummyPageStyled>
      <ul>
        {users.map((user, idx) => (
          <li key={`${user.id}_${idx}`}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </DummyPageStyled>
  );
}

DummyPage.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
