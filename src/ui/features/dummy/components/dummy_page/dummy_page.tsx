import { ReactElement, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/src/ui/state";
import { getLoadingState, getUsers, getUsersThunk } from "@/src/ui/features/dummy/state/dummy.slice";
import { BaseLayout } from "@/src/ui/components/base_layout/base_layout";
import { DummyPageStyled } from "@/src/ui/features/dummy/components/dummy_page/dummy_page.styled";
import { SimpleCard } from "@/src/ui/components/simple_card/simple_card";
import { LoaderStyled } from "@/src/ui/components/loader/loader.styled";
import { useBreakpointsMatch } from "@/src/ui/hooks/breakpoint_match.hook";
import { useRouter } from "next/router";

export default function DummyPage() {
  const dispatch = useAppDispatch();
  const users = useAppSelector(getUsers);
  const loadingUsers = useAppSelector(getLoadingState);
  const { mdAndUp } = useBreakpointsMatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(getUsersThunk());
  }, [dispatch]);

  return (
    <DummyPageStyled>
      {mdAndUp && <h2>Dummy page</h2>}
      {loadingUsers ? <LoaderStyled /> : users.map((user, idx) => <SimpleCard key={`${user.id}_${idx}`} title={user.name} subtitle={user.email} />)}
    </DummyPageStyled>
  );
}

DummyPage.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
