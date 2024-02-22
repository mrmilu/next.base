import type { PropsWithChildren } from "react";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { pick } from "lodash";

interface Props {
  keys: Array<Partial<keyof IntlMessages>>;
}

export default function LocaleProvider({ keys, children }: PropsWithChildren<Props>) {
  const messages = useMessages();

  return <NextIntlClientProvider messages={pick(messages, keys)}>{children}</NextIntlClientProvider>;
}
