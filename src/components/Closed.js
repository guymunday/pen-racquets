import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { gsap } from "gsap"
import { loadImage } from "../actions/actions"
import hole from "../assets/images/hole.svg"
import BottomButtons from "./BottomButtons"

const KeenStyles = styled.div`
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
    .image-hole {
      max-width: 280px;
      object-fit: unset;
      pointer-events: none;
    }
  }
  .keen-details {
    width: 100%;
    text-align: center;
    padding: 20px;
    > *:not(h1) {
      max-width: 400px;
    }
    > * {
      margin: 0 auto 20px auto;
    }
  }
`

export default function Closed({ data }) {
  const [loading, setLoading] = React.useState(true)
  const imagesToLoad = [hole, data?.data?.data?.result?.lost_image?.url]

  React.useEffect(() => {
    Promise.all(imagesToLoad.map((image) => loadImage(image))).then(() => {
      setLoading(false)
    })
  }, [])

  React.useEffect(() => {
    gsap.to(".prize-image", {
      delay: 0.2,
      duration: 0.8,
      yPercent: -185,
      rotate: -3,
    })
  }, [loading])

  return (
    <>
      {!loading && (
        <KeenStyles>
          <div className="prize-image-reveal">
            <img
              className="prize-image"
              src={data?.data?.data?.result?.lost_image?.url}
              alt=""
            />
            <img className="image-hole" src={hole} alt="" />
          </div>
          <div className="keen-details">
            <h1>{data?.data?.data?.block?.title}</h1>
            <p>{data?.data?.data?.block?.text} </p>
            <Link
              to="/leaderboard"
              className="button-alt"
              style={{ display: "block" }}
            >
              Go to leaderboard
            </Link>
            <a
              className="button"
              href="https://www.penhaligons.com/"
              target="_blank"
              rel="noreferrer"
            >
              {data?.data?.data?.block?.button_text}
            </a>
          </div>
          <BottomButtons />
        </KeenStyles>
      )}
    </>
  )
}
