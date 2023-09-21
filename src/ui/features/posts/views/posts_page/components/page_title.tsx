"use client";

import { useBreakpointsMatch } from "@front_web_mrmilu/hooks";

export default function PageTitle() {
  const { mdAndUp } = useBreakpointsMatch();
  return mdAndUp ? <h2>Posts SSR page</h2> : <></>;
}
