import React from "react";
import styled from "styled-components";
import axios from "axios";
import {
  useGameStateContext,
} from "../reducer/gameReducer";
import Popup from "./Popup";
import tennisPlayer from "../assets/images/tennis-player.png";

const StyledLeaderboardForm = styled.div`
  position: relative;
  > * {
    margin-bottom: 20px;
  }
  .form-image {
    display: block;
    position: absolute;
    top: -65%;
    left: 30%;
    width: 180px;
  }
`;

export default function LeaderboardForm() {
  const [formSubmitted, setFormSubmitted] = React.useState(false);
  const [initial, setInitial] = React.useState("");
  const { id, url, score } = useGameStateContext();

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post(`${url}/api/v1/leaderboard`, {
        id,
        initial,
      })
      .then((res) => {
        setFormSubmitted(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleReturnButton() {
    setFormSubmitted(true);
  }

  return (
    <>
      {!formSubmitted && (
        <Popup>
          <StyledLeaderboardForm>
            <img className="form-image" src={tennisPlayer} alt="" />
            <div>
              <h1 style={{ fontSize: 60, marginTop: 100 }}>{score}</h1>
              <h2>Your score</h2>
            </div>
            <p>
              Wow, you got a top score. Enter your initials on the leaderboard
              for internet fame.
            </p>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                maxLength="3"
                minLength="1"
                value={initial}
                name="initials"
                onChange={(e) => setInitial(e.target.value)}
                placeholder="Enter your initials"
              />
              <button
                className="button"
                type="submit"
                style={{ width: "100%", margin: 0 }}
              >
                Submit
              </button>
            </form>
            <button className="button" onClick={handleReturnButton}>
              Return to your prize
            </button>
          </StyledLeaderboardForm>
        </Popup>
      )}
    </>
  );
}
