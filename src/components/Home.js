import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  useGameStateContext,
  useGameDispatchContext,
} from "../reducer/gameReducer";
import { loadImage } from "../actions/actions";

// images
import lemonBall from "../assets/images/lemon-ball.png";
import tennisPlayer from "../assets/images/tennis-player.png";
import umpire from "../assets/images/umpire.png";
import background from "../assets/images/home-background.png";

const imagesToLoad = [lemonBall, tennisPlayer, umpire, background];

const HomeStyles = styled.div`
  text-align: center;
  position: relative;
  min-height: 650px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #ebd668;
  .home-img {
    position: absolute;
    pointer-events: none;
  }
  .home-background {
    top: 50%;
    left: 50%;
    min-width: 100%;
    min-height: 100%;
    transform: translate(-50%, -50%);
  }
  .home-image-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    width: 500px;
    height: 100%;
    .home-ball-img {
      width: 75px;
      top: 0;
      left: 50%;
    }
    .home-player-img {
      width: 350px;
      bottom: 0;
      left: 48%;
      @media screen and (max-width: 375px) {
        width: 300px;
      }
    }
    .home-umpire-img {
      width: 120px;
      top: 30%;
      left: 5%;
      @media screen and (max-width: 375px) {
        width: 100px;
        left: 10%;
      }
    }
  }
  .home-inner {
    position: relative;
    z-index: 2;
    padding: 20px;
    max-width: 460px;
    margin: auto;
    h1 {
      font-size: 86px;
      line-height: 1;
      @media screen and (max-width: 375px) {
        font-size: 70px;
      }
    }
    .home-button {
      margin: 100px auto;
    }
  }
`;

export default function Home({ data, tries, apiUrl }) {
  const [loading, setLoading] = React.useState(true);
  const dispatch = useGameDispatchContext();
  const { id } = useGameStateContext();

  const index = data?.data?.data?.index;
  const terms = index?.terms_text.replace("{tries}", tries);

  React.useEffect(() => {
    axios
      .post(`${apiUrl}/api/v1/start`, {
        try: 3,
      })
      .then((res) =>
        dispatch({
          type: "UPDATE_ID",
          id: res.data.data.id,
        })
      )
      .catch((error) => console.log(error));
  }, []);

  React.useEffect(() => {
    Promise.all(imagesToLoad.map((image) => loadImage(image))).then(() => {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    });
  }, []);

  return (
    <>
      <HomeStyles>
        {loading ? (
          <h1 className="game-loading">Loading...</h1>
        ) : (
          <>
            <img src={background} alt="" className="home-background home-img" />

            <div className="home-image-container">
              <img src={lemonBall} alt="" className="home-ball-img home-img" />
              <img
                src={tennisPlayer}
                alt=""
                className="home-player-img home-img"
              />
              <img src={umpire} alt="" className="home-umpire-img home-img" />
            </div>

            <div className="home-inner">
              <p>{index?.small_title}</p>
              <h1>{index?.big_title}</h1>
              <Link to="/play" className="button home-button">
                {index?.button_text}
              </Link>
              <p>{index?.text}</p>
              <button style={{ marginTop: 20 }} className="button-alt">
                See the leaderboard
              </button>
              <p style={{ marginTop: 20 }}>
                <a href="/" style={{ fontSize: 16 }}>
                  {terms}
                </a>
              </p>
            </div>
          </>
        )}
      </HomeStyles>
    </>
  );
}
