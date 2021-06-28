import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

const Styles = styled.div`
  display: flex;
  width: 100%;
  padding: 15px 15px;
  z-index: 6;
  font-size: 18px;
  @media screen and (max-width: 500px) {
    justify-content: space-between;
  }
  .tc-button {
    margin-left: 20px;
  }
`;

export default function BottomButtons({ ...rest }) {
  const location = useLocation();
  return (
    <>
      <Styles
        style={{
          position: location.pathname === "/play" ? "absolute" : "",
          bottom: location.pathname === "/play" ? 20 : "",
          padding:
            location.pathname !== "/play" ? "15px 15px 30px 15px" : "15px",
        }}
        {...rest}
      >
        <button
          className="button-alt music-button"
          style={{
            color: location.pathname === "/play" ? "var(--off-white)" : "black",
          }}
        >
          Music
        </button>
        <a
          href="/"
          className="button-alt tc-button"
          style={{
            color: location.pathname === "/play" ? "var(--off-white)" : "black",
          }}
        >
          Open T&Cs
        </a>
      </Styles>
    </>
  );
}
