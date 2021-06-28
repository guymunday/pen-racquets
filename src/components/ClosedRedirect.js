import React from "react";
import { Redirect } from "react-router-dom";
import { useGameStateContext } from "../reducer/gameReducer";

export default function ClosedRedirect() {
  const { open } = useGameStateContext();

  if (parseInt(open) === 2) {
    return <Redirect to="/closed" />;
  }

  return <></>;
}
