import React from "react";
import styled from "styled-components";
import { Link, Redirect } from "react-router-dom";
import {
  useGameStateContext,
  useGameDispatchContext,
} from "../reducer/gameReducer";
import gsap from "gsap";
import AjaxButton from "./AjaxButton";
import hole from "../assets/images/hole.svg";

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
    .prize-image {
      position: absolute;
      max-width: 170px;
      bottom: -100%;
      pointer-events: none;
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

export default function PrizeReveal({ data, tries }) {
  const { prize, score, id } = useGameStateContext();
  const dispatch = useGameDispatchContext();

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

  React.useEffect(() => {
    gsap.to(".prize-image", {
      delay: 0.2,
      duration: 0.8,
      yPercent: -90,
    });
  }, [prize]);

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
      );
  });

  if (!id) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <PrizeStyles>
        {prize === "none" ? (
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
              <Link
                className="button"
                to="/play"
                onClick={() => dispatch({ type: "UPDATE_PRIZE", prize: false })}
              >
                {data?.data?.data?.result?.play_again}
              </Link>
              <p>
                <a href="/" style={{ fontSize: 16 }}>
                  {terms}
                </a>
              </p>
            </div>
          </>
        ) : prize === "bronze" ? (
          <>
            <div className="prize-image-reveal">
              <img
                className="prize-image"
                src={data?.data?.data?.result?.bronze_image?.url}
                alt=""
              />
              <img className="image-hole" src={hole} alt="" />
            </div>
            <h1 className="match-text">MATCH!</h1>
            <div className="prize-details">
              <h1>{data?.data?.data?.result?.bronze_text}</h1>
              <p>{bronzeBottomText}</p>
              <AjaxButton />
              <Link
                className="button"
                to="/play"
                onClick={() => dispatch({ type: "UPDATE_PRIZE", prize: false })}
              >
                {data?.data?.data?.result?.play_again}
              </Link>
              <p>
                <a href="/" style={{ fontSize: 16 }}>
                  {terms}
                </a>
              </p>
            </div>
          </>
        ) : prize === "silver" ? (
          <>
            <div className="prize-image-reveal">
              <img
                className="prize-image"
                src={data?.data?.data?.result?.silver_image?.url}
                alt=""
              />
              <img className="image-hole" src={hole} alt="" />
            </div>
            <h1 className="match-text">MATCH!</h1>
            <div className="prize-details">
              <h1>{data?.data?.data?.result?.silver_text}</h1>
              <p>{silverBottomText}</p>
              <AjaxButton />
              <Link
                className="button"
                to="/play"
                onClick={() => dispatch({ type: "UPDATE_PRIZE", prize: false })}
              >
                {data?.data?.data?.result?.play_again}
              </Link>
              <p>
                <a href="/" style={{ fontSize: 16 }}>
                  {terms}
                </a>
              </p>
            </div>
          </>
        ) : prize === "gold" ? (
          <>
            <div className="prize-image-reveal">
              <img
                className="prize-image"
                src={data?.data?.data?.result?.gold_image?.url}
                alt=""
              />
              <img className="image-hole" src={hole} alt="" />
            </div>
            <h1 className="match-text">MATCH!</h1>
            <div className="prize-details">
              <h1>{data?.data?.data?.result?.gold_text}</h1>
              <p>{goldBottomText}</p>
              <AjaxButton />
              <Link
                className="button"
                to="/play"
                onClick={() => dispatch({ type: "UPDATE_PRIZE", prize: false })}
              >
                {data?.data?.data?.result?.play_again}
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
      </PrizeStyles>
    </>
  );
}
