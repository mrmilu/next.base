import type { ReactElement } from "react";
import { useMemo } from "react";
import { BaseLayout } from "@/src/ui/components/base_layout/base_layout";
import { useBreakpointsMatch } from "@front_web_mrmilu/hooks";
import { User } from "@/src/core/users/domain/models/user";
import type { ConstructorType } from "@/src/common/interfaces/constructor_type";
import { UserModal } from "@/src/ui/features/users/components/user_modal/user_modal";
import { useUiProvider } from "@/src/ui/providers/ui.provider";
import css from "../users_page/users_page.css";
import { SimpleCard } from "@/src/ui/components/simple_card/simple_card";

export interface UsersPageProps {
  serializedUsers: Array<Record<string, unknown>>;
}

export default function UsersPage({ serializedUsers }: UsersPageProps) {
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
    <div className={css.wrapper}>
      {mdAndUp && <h2>Users SSR page</h2>}
      {usersDomain.map((user, idx) => (
        <SimpleCard onClick={() => showUserModal(user)} key={`${user.id}_${idx}`} title={user.name} subtitle={user.email} />
      ))}
    </div>
  );
}

UsersPage.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout logged={page.props.logged}>{page}</BaseLayout>;
};
