import React from "react";
import styled from "styled-components";
import { loadImage } from "../actions/actions";
import { useLocation } from "react-router-dom";
import crowd from "../assets/images/crowd.png";
import texture from "../assets/images/texture.png";

const imagesToLoad = [crowd, texture];

const GameLayoutStyles = styled.div`
  background-color: #cf9970;
  width: 100%;
  position: relative;
  min-height: 650px;
  overflow: hidden;
  #texture {
    position: absolute;
    top: 50%;
    left: 50%;
    /* z-index: 5; */
    min-width: 100%;
    min-height: 100%;
    transform: translate(-50%, -50%);
    opacity: 0.2;
    pointer-events: none;
  }
  #crowd-image {
    position: absolute;
    bottom: -1%;
    right: 0;
    width: 110%;
    max-width: 475px;
    pointer-events: none;
    @media screen and (min-width: 1000px) {
      max-width: 600px;
    }
  }
`;

export default function GameLayout({ children }) {
  const [loading, setLoading] = React.useState(true);
  const location = useLocation();

  React.useEffect(() => {
    Promise.all(imagesToLoad.map((image) => loadImage(image))).then(() => {
      setLoading(false);
    });
  }, []);

  return (
    <>
      <GameLayoutStyles>
        {!loading && (
          <>
            <img src={texture} alt="" id="texture" />
            {location.pathname !== "/leaderboard" &&
              location.pathname !== "/keen" &&
              location.pathname !== "/closed" && (
                <img src={crowd} alt="" id="crowd-image" />
              )}
            {children}
          </>
        )}
        {loading && <h1 className="game-loading">Loading...</h1>}
      </GameLayoutStyles>
    </>
  );
}
