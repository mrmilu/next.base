import type { ReactElement } from "react";
import { useMemo } from "react";
import { BaseLayout } from "@/src/ui/components/base_layout/base_layout";
import Styled from "@/src/ui/features/dummy/components/dummy_page/dummy_page.styled";
import { showModal } from "@/src/ui/state/ui.slice";
import { UserModal } from "@/src/ui/features/dummy/components/user_modal/user_modal";
import { useAppDispatch } from "@/src/ui/state";
import { useBreakpointsMatch } from "@front_web_mrmilu/hooks";
import { User } from "@/src/core/users/domain/models/user";
import type { ConstructorType } from "@/src/common/interfaces/constructor_type";

export interface DummySSRPageProps {
  serializedUsers: string;
}

export default function DummySSRPage({ serializedUsers }: DummySSRPageProps) {
  const dispatch = useAppDispatch();
  const { mdAndUp } = useBreakpointsMatch();
  const usersDomain: Array<User> = useMemo(
    () => JSON.parse(serializedUsers).map((value: Record<string, unknown>) => new User(value as ConstructorType<User>)),
    [serializedUsers]
  );

  const showUserModal = (user: User) => {
    dispatch(showModal(<UserModal user={user} />));
  };

  return (
    <Styled.Wrapper>
      {mdAndUp && <h2>Dummy SSR page</h2>}
      {usersDomain.map((user, idx) => (
        <Styled.SimpleCard onClick={() => showUserModal(user)} key={`${user.id}_${idx}`} title={user.name} subtitle={user.email} />
      ))}
    </Styled.Wrapper>
  );
}

DummySSRPage.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout logged={page.props.logged}>{page}</BaseLayout>;
};
