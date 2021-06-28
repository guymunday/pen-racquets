import React from "react";
import styled from "styled-components";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { useGameDispatchContext } from "../reducer/gameReducer";

const StyledLink = styled(Link)`
  span {
    display: block;
    font-size: 0.95rem;
    text-transform: none;
  }
`;

export default function PlayAgainButton({ children }) {
  const dispatch = useGameDispatchContext();
  const [cookies] = useCookies(["tries"]);

  function handleClick() {
    dispatch({ type: "UPDATE_PRIZE", prize: false });
  }

  return (
    <>
      {parseInt(cookies.tries) > 0 ? (
        <StyledLink className="button" to="/play" onClick={handleClick}>
          {children}
          <span>{cookies.tries} tries remaining</span>
        </StyledLink>
      ) : (
        <a
          className="button"
          href="https://www.penhaligons.com/"
          target="_blank"
          rel="noreferrer"
        >
          Continue Shopping
        </a>
      )}
    </>
  );
}
