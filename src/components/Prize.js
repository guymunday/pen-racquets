import React from "react";
import styled from "styled-components";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { useGameStateContext } from "../reducer/gameReducer";
import { gsap } from "gsap";
import { loadImage } from "../actions/actions";
import AjaxButton from "./AjaxButton";
import PlayAgainButton from "./PlayAgainButton";
import hole from "../assets/images/hole.svg";
import BottomButtons from "./BottomButtons";
import LeaderboardForm from "./LeaderboardForm";
import KeenRedirect from "./KeenRedirect";
import ClosedRedirect from "./ClosedRedirect";
import AddedToCart from "./AddedToCart";

const PrizeStyles = styled.div`
  .prize-image-reveal {
    position: relative;
    padding-top: 220px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    height: 100%;
    overflow: hidden;
    .prize-image,
    .prize-image-bottle {
      position: absolute;
      max-width: 170px;
      bottom: -200%;
      pointer-events: none;
    }
    .prize-image-bottle {
      max-width: 140px;
    }
    .image-hole {
      max-width: 280px;
      object-fit: unset;
      pointer-events: none;
    }
  }
  .match-text {
    padding: 20px;
    font-size: 87px;
    color: var(--off-white);
    text-align: center;
    margin: auto;
    opacity: 0;
  }
  .prize-details {
    width: 100%;
    text-align: center;
    opacity: 0;
    padding: 20px;
    > *:not(h1) {
      max-width: 400px;
    }
    > * {
      margin: 0 auto 20px auto;
    }
  }
`;

export default function PrizeReveal({ data, tries, apiUrl }) {
  const [formSubmitted, setFormSubmitted] = React.useState(false);
  const [leaderboardData, setLeaderboardData] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const { score, id, previous } = useGameStateContext();
  const [showLeaderboardForm, setShowLeaderboardForm] = React.useState(false);

  const bronzeBottomText = data?.data?.data?.result?.bronze_text_bottom.replace(
    "{total}",
    score
  );
  const silverBottomText = data?.data?.data?.result?.silver_text_bottom.replace(
    "{total}",
    score
  );
  const goldBottomText = data?.data?.data?.result?.gold_text_bottom.replace(
    "{total}",
    score
  );
  const terms = data?.data?.data?.index?.terms_text.replace("{tries}", tries);

  const imagesToLoad = [
    hole,
    previous === "none"
      ? data?.data?.data?.result?.lost_image?.url
      : previous === "bronze"
      ? data?.data?.data?.result?.bronze_image?.url
      : previous === "silver"
      ? data?.data?.data?.result?.silver_image?.url
      : data?.data?.data?.result?.gold_image?.url,
  ];

  React.useEffect(() => {
    Promise.all(imagesToLoad.map((image) => loadImage(image))).then(() => {
      setLoading(false);
    });
  }, []);

  React.useEffect(() => {
    axios
      .post(`${apiUrl}/api/v1/end`, {
        id,
        point: score,
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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

  React.useEffect(() => {
    if (leaderboardData?.data?.data.length < 7) {
      setShowLeaderboardForm(true);
    }
    if (leaderboardData?.data?.data[6]?.point < score) {
      setShowLeaderboardForm(true);
    }
  }, []);

  React.useEffect(() => {
    gsap.to(".prize-image", {
      delay: 0.2,
      duration: 0.8,
      yPercent: -185,
      rotate: -3,
    });

    gsap.to(".prize-image-bottle", {
      delay: 0.2,
      duration: 0.8,
      yPercent: -195,
      rotate: 6,
    });
  }, [loading]);

  React.useEffect(() => {
    let tl = gsap.timeline();

    tl.fromTo(
      ".match-text",
      {
        opacity: 0,
        display: "none",
      },
      { opacity: 1, display: "block", duration: 0.5 }
    )
      .to(
        ".match-text",
        {
          opacity: 0,
          display: "none",
        },
        "+=2"
      )
      .to(
        "#crowd-image",
        {
          yPercent: 100,
          duration: 0.5,
        },
        "<"
      )
      .fromTo(
        ".prize-details",
        {
          opacity: 0,
          display: "none",
        },
        {
          opacity: 1,
          display: "block",
          duration: 0.5,
        }
      )
      .fromTo(
        ".prize-reveal",
        {
          opacity: 0,
          display: "none",
        },
        {
          opacity: 1,
          display: "block",
          duration: 0.5,
        },
        "<"
      );
  }, [loading]);

  if (!id) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <KeenRedirect />
      <ClosedRedirect />
      {!loading && (
        <PrizeStyles>
          {previous === "none" ? (
            <>
              <div className="prize-image-reveal">
                <img
                  className="prize-image"
                  src={data?.data?.data?.result?.lost_image?.url}
                  alt=""
                />
                <img className="image-hole" src={hole} alt="" />
              </div>
              <h1 className="match-text">MATCH!</h1>
              <div className="prize-details">
                <h1>{data?.data?.data?.result?.lost_text}</h1>
                <p>{data?.data?.data?.result?.lost_on_third_try_text} </p>
                <PlayAgainButton>
                  {data?.data?.data?.result?.play_again}
                </PlayAgainButton>
                <Link
                  to="/leaderboard"
                  className="button-alt"
                  style={{ display: "block" }}
                >
                  Go to leaderboard
                </Link>
                <p>
                  <a href="/" style={{ fontSize: 16 }}>
                    {terms}
                  </a>
                </p>
              </div>
            </>
          ) : previous === "bronze" ? (
            <>
              <div className="prize-image-reveal">
                <img
                  className="prize-image-bottle"
                  src={data?.data?.data?.result?.bronze_image?.url}
                  alt=""
                />
                <img className="image-hole" src={hole} alt="" />
              </div>
              <h1 className="match-text">MATCH!</h1>
              <div className="prize-details">
                <h1>{data?.data?.data?.result?.bronze_text}</h1>
                <p>{bronzeBottomText}</p>
                <AjaxButton setFormSubmitted={setFormSubmitted} />
                <PlayAgainButton>
                  {data?.data?.data?.result?.play_again}
                </PlayAgainButton>
                <Link
                  to="/leaderboard"
                  className="button-alt"
                  style={{ display: "block" }}
                >
                  Go to leaderboard
                </Link>
                <p>
                  <a href="/" style={{ fontSize: 16 }}>
                    {terms}
                  </a>
                </p>
              </div>
            </>
          ) : previous === "silver" ? (
            <>
              <div className="prize-image-reveal">
                <img
                  className="prize-image-bottle"
                  src={data?.data?.data?.result?.silver_image?.url}
                  alt=""
                />
                <img className="image-hole" src={hole} alt="" />
              </div>
              <h1 className="match-text">MATCH!</h1>
              <div className="prize-details">
                <h1>{data?.data?.data?.result?.silver_text}</h1>
                <p>{silverBottomText}</p>
                <AjaxButton setFormSubmitted={setFormSubmitted} />
                <PlayAgainButton>
                  {data?.data?.data?.result?.play_again}
                </PlayAgainButton>
                <Link
                  to="/leaderboard"
                  className="button-alt"
                  style={{ display: "block" }}
                >
                  Go to leaderboard
                </Link>
                <p>
                  <a href="/" style={{ fontSize: 16 }}>
                    {terms}
                  </a>
                </p>
              </div>
            </>
          ) : previous === "gold" ? (
            <>
              <div className="prize-image-reveal">
                <img
                  className="prize-image-bottle"
                  src={data?.data?.data?.result?.gold_image?.url}
                  alt=""
                />
                <img className="image-hole" src={hole} alt="" />
              </div>
              <h1 className="match-text">MATCH!</h1>
              <div className="prize-details">
                <h1>{data?.data?.data?.result?.gold_text}</h1>
                <p>{goldBottomText}</p>
                <AjaxButton setFormSubmitted={setFormSubmitted} />
                <PlayAgainButton>
                  {data?.data?.data?.result?.play_again}
                </PlayAgainButton>
                <Link
                  to="/leaderboard"
                  className="button-alt"
                  style={{ display: "block" }}
                >
                  Go to leaderboard
                </Link>
                <p>
                  <a href="/" style={{ fontSize: 16 }}>
                    {terms}
                  </a>
                </p>
              </div>
            </>
          ) : (
            <Redirect to="/" />
          )}
          <BottomButtons className="prize-reveal" />
          {showLeaderboardForm && <LeaderboardForm />}
          {formSubmitted && <AddedToCart data={data} terms={terms} />}
        </PrizeStyles>
      )}
    </>
  );
}
