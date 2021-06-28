import React from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import BottomButtons from "./BottomButtons";
import PlayAgainButton from "./PlayAgainButton";
import { useGameStateContext } from "../reducer/gameReducer";
import { useCookies } from "react-cookie";

const LeaderboardStyles = styled.div`
  width: 100%;
  max-width: 400px;
  margin: auto;
  padding: 20px;
  text-align: center;
  > * {
    margin-bottom: 20px;
  }
  h1 {
    margin-top: 20px;
  }
  .leaderboard-table {
    .leaderboard-row {
      display: flex;
      justify-content: space-between;
      padding: 15px 0;
      border-bottom: 1px solid var(--off-white);
      p {
        text-transform: uppercase;
      }
    }
  }
`;

export default function Leaderboard({ mainData, tries, apiUrl }) {
  const [leaderboardData, setLeaderboardData] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const { previous } = useGameStateContext();
  const [cookies] = useCookies(["tries"]);

  const terms = mainData?.data?.data?.index?.terms_text.replace(
    "{tries}",
    tries
  );

  React.useEffect(() => {
    axios
      .get(`${apiUrl}/api/v1/leaderboard`)
      .then((res) => {
        setLeaderboardData(res);
        setLoading(false);
      })
      .catch((error) =>
        console.log(
          "Oh no! There has been an error fetching the leaderboard!",
          error
        )
      );
  }, []);

  return (
    <>
      {!loading && (
        <>
          <LeaderboardStyles>
            <h1>{mainData?.data?.data?.leaderboard?.title}</h1>
            <p>{mainData?.data?.data?.leaderboard?.text}</p>
            <div className="leaderboard-table">
              {leaderboardData?.data?.data.map((l, i) => {
                return (
                  <div className="leaderboard-row" key={i}>
                    <p>{l?.initial}</p>
                    <p>{l?.point}</p>
                  </div>
                );
              })}
            </div>
            {cookies.tries === undefined && (
              <Link className="button" to="/">
                {mainData?.data?.data?.leaderboard?.button_text}
              </Link>
            )}
            {!previous ? (
              <>
                {parseInt(cookies.tries) > 0 && (
                  <Link className="button" to="/">
                    {mainData?.data?.data?.leaderboard?.button_text}
                  </Link>
                )}
              </>
            ) : (
              <Link className="button" to="/results">
                Return to Prize
              </Link>
            )}
            <PlayAgainButton>
              {previous ? "Play Again" : "PLAY"}
            </PlayAgainButton>
            <p>
              <a href="/" style={{ fontSize: 16 }}>
                {terms}
              </a>
            </p>
          </LeaderboardStyles>
          <BottomButtons />
        </>
      )}
    </>
  );
}
