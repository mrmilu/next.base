import type { ReactElement } from "react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/src/ui/state";
import { getLoadingState, getUsers, getUsersThunk } from "@/src/ui/features/dummy/state/dummy.slice";
import { BaseLayout } from "@/src/ui/components/base_layout/base_layout";
import { DummyPageSimpleCardStyled, DummyPageStyled } from "@/src/ui/features/dummy/components/dummy_page/dummy_page.styled";
import { LoaderStyled } from "@/src/ui/components/loader/loader.styled";
import { useBreakpointsMatch } from "@/src/ui/hooks/breakpoint_match.hook";
import type { DummyUser } from "@/src/core/dummy/domain/models/dummy_user";
import { UserModal } from "@/src/ui/features/dummy/components/user_modal/user_modal";
import { showModal } from "@/src/ui/state/ui.slice";
import { makeCancelable } from "@front_web_mrmilu/utils";

export default function DummyPage() {
  const dispatch = useAppDispatch();
  const users = useAppSelector(getUsers);
  const loadingUsers = useAppSelector(getLoadingState);
  const { mdAndUp } = useBreakpointsMatch();

  useEffect(() => {
    const cancelablePromise = makeCancelable(dispatch(getUsersThunk()));
    cancelablePromise.promise.then(() => {
      console.log("Expensive side effect");
    });
    cancelablePromise.onCancel(() => {
      console.log("Promise canceled");
    });

    return () => {
      cancelablePromise.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showUserModal = (user: DummyUser) => {
    dispatch(showModal(<UserModal user={user} />));
  };

  return (
    <DummyPageStyled>
      {mdAndUp && <h2>Dummy page</h2>}
      {loadingUsers ? (
        <LoaderStyled />
      ) : (
        users.map((user, idx) => (
          <DummyPageSimpleCardStyled onClick={() => showUserModal(user)} key={`${user.id}_${idx}`} title={user.name} subtitle={user.email} />
        ))
      )}
    </DummyPageStyled>
  );
}

DummyPage.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
