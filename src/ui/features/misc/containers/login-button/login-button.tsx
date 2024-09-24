"use client";
import { Button } from "@/src/ui/components/button/button";
import { useUserStore } from "@/src/users/application/stores/user-store";
import React, { useEffect } from "react";
import { LoggingModal } from "@/src/ui/components/logging-modal/logging-modal";
import { CookieUtils } from "@front_web_mrmilu/utils";
import { useUiProvider } from "@/src/ui/providers/ui.provider";
import { useSearchParams } from "next/navigation";

export default function LoginButton() {
  const setLogged = useUserStore((state) => state.setLogged);
  const login = useUserStore((state) => state.login);
  const logout = useUserStore((state) => state.logout);
  const isUserLogged = useUserStore((state) => state.logged);
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
