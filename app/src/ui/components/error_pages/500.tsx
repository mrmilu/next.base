import type { ReactElement } from "react";
import { BaseLayout } from "@/src/ui/components/base_layout/base_layout";
import { AppErrorBoundary } from "@/src/ui/components/app_error_boundary/app_error_boundary";

export default function Page500() {
  return <h1>500 - Server-side error occurred</h1>;
}

Page500.getLayout = function getLayout(page: ReactElement) {
  return (
    <BaseLayout logged={page.props.logged}>
      <AppErrorBoundary>{page}</AppErrorBoundary>
    </BaseLayout>
  );
};
