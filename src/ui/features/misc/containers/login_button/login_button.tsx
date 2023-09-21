"use client";
import { Button } from "@/src/ui/components/button/button";
import { useUserProvider } from "@/src/ui/providers/user.provider";
import React, { useEffect } from "react";
import { LoggingModal } from "@/src/ui/components/logging_modal/logging_modal";
import { CookieUtils } from "@front_web_mrmilu/utils";
import { useUiProvider } from "@/src/ui/providers/ui.provider";
import { useSearchParams } from "next/navigation";

export default function LoginButton() {
  const setLogged = useUserProvider((state) => state.setLogged);
  const login = useUserProvider((state) => state.login);
  const logout = useUserProvider((state) => state.logout);
  const isUserLogged = useUserProvider((state) => state.logged);
  const showModal = useUiProvider((state) => state.showModal);
  const params = useSearchParams();
  const protectedRouteAccessAttempt = params?.get("protectedRouteAccessAttempt");

  useEffect(() => {
    if (protectedRouteAccessAttempt) {
      showModal(<LoggingModal />);
    }
  }, [protectedRouteAccessAttempt, showModal]);

  useEffect(() => {
    const logged = CookieUtils.getCookie("logged");
    setLogged(logged === "true");
  }, [setLogged]);

  return <Button onClick={isUserLogged ? logout : login}>{isUserLogged ? "Log out" : "Log in"}</Button>;
}
