import { ReactElement, useEffect, useMemo } from "react";
import { BaseLayout } from "@/src/ui/components/base_layout/base_layout";
import { DummyPageStyled } from "@/src/ui/features/dummy/components/dummy_page/dummy_page.styled";
import { SimpleCard } from "@/src/ui/components/simple_card/simple_card";
import { useBreakpointsMatch } from "@/src/ui/hooks/breakpoint_match.hook";
import { useRouter } from "next/router";
import { plainToClass } from "class-transformer";
import { DummyUser } from "@/src/core/dummy/domain/models/dummy_user";

export interface DummySSRPageProps {
  serializedUsers: string;
}

export default function DummySSRPage({ serializedUsers }: DummySSRPageProps) {
  const { mdAndUp } = useBreakpointsMatch();
  const router = useRouter();
  const usersDomain: Array<DummyUser> = useMemo(
    () => JSON.parse(serializedUsers).map((value: Record<string, any>) => plainToClass(DummyUser, value)),
    [serializedUsers]
  );

  return (
    <DummyPageStyled>
      {mdAndUp && <h2>Dummy SSR page</h2>}
      {usersDomain.map((user, idx) => (
        <SimpleCard key={`${user.id}_${idx}`} title={user.name} subtitle={user.email} />
      ))}
    </DummyPageStyled>
  );
}

DummySSRPage.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
