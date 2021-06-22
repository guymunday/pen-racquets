import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  useGameStateContext,
  useGameDispatchContext,
} from "../reducer/gameReducer";

// images
import lemonBall from "../assets/images/lemon-ball.png";
import tennisPlayer from "../assets/images/tennis-player.png";
import umpire from "../assets/images/umpire.png";

const HomeStyles = styled.div`
  text-align: center;
  position: relative;
  min-height: 650px;
  overflow: hidden;

  background-color: #ebd668;
  .home-img {
    position: absolute;
    pointer-events: none;
  }
  .home-ball-img {
    width: 60px;
    top: 0;
    left: 50%;
  }
  .home-player-img {
    width: 300px;
    bottom: 0;
    left: 48%;
  }
  .home-umpire-img {
    width: 120px;
    top: 30%;
    left: 5%;
  }
  .home-inner {
    position: relative;
    z-index: 2;
    padding: 20px;
    max-width: 500px;
    margin: auto;
    h1 {
      font-size: 86px;
    }
    .home-button {
      margin: 100px auto;
    }
  }
`;

export default function Home({ data, tries, apiUrl }) {
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

  return (
    <>
      <HomeStyles>
        <img src={lemonBall} alt="" className="home-ball-img home-img" />
        <img src={tennisPlayer} alt="" className="home-player-img home-img" />
        <img src={umpire} alt="" className="home-umpire-img home-img" />
        <div className="home-inner">
          <p>{index?.small_title}</p>
          <h1>{index?.big_title}</h1>
          <Link to="/play" className="button home-button">
            {index?.button_text}
          </Link>
          <p>{index?.text}</p>
          <button className="button-alt">See the leaderboard</button>
          <p>
            <a href="/" style={{ fontSize: 16 }}>
              {terms}
            </a>
          </p>
        </div>
      </HomeStyles>
    </>
  );
}
