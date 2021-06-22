import React from "react";
import styled from "styled-components";
import {
  useGameStateContext,
  useGameDispatchContext,
} from "../reducer/gameReducer";
import gsap from "gsap";

const PrizeStyles = styled.div``;

export default function Prize() {
  const { prize, gameScore } = useGameStateContext();

  return (
    <>
      <PrizeStyles>
        {prize}, {score}
      </PrizeStyles>
    </>
  );
}
