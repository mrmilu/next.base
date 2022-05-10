import type { ReactElement } from "react";
import { useMemo } from "react";
import { BaseLayout } from "@/src/ui/components/base_layout/base_layout";
import { DummyPageSimpleCardStyled, DummyPageStyled } from "@/src/ui/features/dummy/components/dummy_page/dummy_page.styled";
import { plainToClass } from "class-transformer";
import { DummyUser } from "@/src/core/dummy/domain/models/dummy_user";
import { showModal } from "@/src/ui/state/ui.slice";
import { UserModal } from "@/src/ui/features/dummy/components/user_modal/user_modal";
import { useAppDispatch } from "@/src/ui/state";
import { useBreakpointsMatch } from "@front_web_mrmilu/hooks";

export interface DummySSRPageProps {
  serializedUsers: string;
}

export default function DummySSRPage({ serializedUsers }: DummySSRPageProps) {
  const dispatch = useAppDispatch();
  const { mdAndUp } = useBreakpointsMatch();
  const usersDomain: Array<DummyUser> = useMemo(
    () => JSON.parse(serializedUsers).map((value: Record<string, unknown>) => plainToClass(DummyUser, value, { excludeExtraneousValues: true })),
    [serializedUsers]
  );

  const showUserModal = (user: DummyUser) => {
    dispatch(showModal(<UserModal user={user} />));
  };

  return (
    <DummyPageStyled>
      {mdAndUp && <h2>Dummy SSR page</h2>}
      {usersDomain.map((user, idx) => (
        <DummyPageSimpleCardStyled onClick={() => showUserModal(user)} key={`${user.id}_${idx}`} title={user.name} subtitle={user.email} />
      ))}
    </DummyPageStyled>
  );
}

DummySSRPage.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
