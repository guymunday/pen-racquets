import React from "react";
import { Redirect } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useGameStateContext } from "../reducer/gameReducer";

export default function KeenRedirect() {
  const [cookies] = useCookies(["tries"]);
  const { id } = useGameStateContext();

  if (!id && parseInt(cookies.tries) <= 0) {
    return <Redirect to="/keen" />;
  }

  return <></>;
}
