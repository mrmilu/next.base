import type { ReactElement } from "react";
import { useMemo } from "react";
import { BaseLayout } from "@/src/ui/components/base_layout/base_layout";
import { useBreakpointsMatch } from "@front_web_mrmilu/hooks";
import { User } from "@/src/core/users/domain/models/user";
import type { ConstructorType } from "@/src/common/interfaces/constructor_type";
import { UserModal } from "@/src/ui/features/users/components/user_modal/user_modal";
import UsersPageStyled from "../users_page/users_page.styled";
import { useUiProvider } from "@/src/ui/providers/ui.provider";

export interface UsersSSRPageProps {
  serializedUsers: Array<Record<string, unknown>>;
}

export default function UsersSSRPage({ serializedUsers }: UsersSSRPageProps) {
  const showModal = useUiProvider((state) => state.showModal);
  const { mdAndUp } = useBreakpointsMatch();
  const usersDomain: Array<User> = useMemo(
    () => serializedUsers.map((value: Record<string, unknown>) => new User(value as ConstructorType<User>)),
    [serializedUsers]
  );

  const showUserModal = (user: User) => {
    showModal(<UserModal user={user} />);
  };

  return (
    <UsersPageStyled.Wrapper>
      {mdAndUp && <h2>Users SSR page</h2>}
      {usersDomain.map((user, idx) => (
        <UsersPageStyled.SimpleCard onClick={() => showUserModal(user)} key={`${user.id}_${idx}`} title={user.name} subtitle={user.email} />
      ))}
    </UsersPageStyled.Wrapper>
  );
}

UsersSSRPage.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout logged={page.props.logged}>{page}</BaseLayout>;
};
