import type { ReactElement } from "react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/src/ui/state";
import { BaseLayout } from "@/src/ui/components/base_layout/base_layout";
import LoaderStyled from "@/src/ui/components/loader/loader.styled";
import { useBreakpointsMatch } from "@front_web_mrmilu/hooks";
import { makeCancelable } from "@front_web_mrmilu/utils";
import type { User } from "@/src/core/users/domain/models/user";
import { UserModal } from "@/src/ui/features/users/components/user_modal/user_modal";
import { getLoadingState, getUsers, getUsersThunk } from "@/src/ui/features/users/state/users.slice";
import UsersPageStyled from "./users_page.styled"
import { useUiProvider } from "@/src/ui/providers/ui.provider";

export default function UsersPage () {
  const dispatch = useAppDispatch();
  const users = useAppSelector(getUsers);
  const loadingUsers = useAppSelector(getLoadingState);
  const { mdAndUp } = useBreakpointsMatch();
  const showModal = useUiProvider(state => state.showModal)

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

  const showUserModal = (user: User) => {
    showModal(<UserModal user={ user } />);
  };

  return (
    <UsersPageStyled.Wrapper>
      { mdAndUp && <h1>Users page</h1> }
      { loadingUsers ? (
        <LoaderStyled />
      ) : (
        users.map((user, idx) => (
          <UsersPageStyled.SimpleCard onClick={ () => showUserModal(user) } key={ `${ user.id }_${ idx }` } title={ user.name }
                                      subtitle={ user.email } />
        ))
      ) }
    </UsersPageStyled.Wrapper>
  );
}

UsersPage.getLayout = function getLayout (page: ReactElement) {
  return <BaseLayout logged={ page.props.logged }>{ page }</BaseLayout>;
};
