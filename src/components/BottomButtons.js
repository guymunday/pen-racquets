import React from "react"
import styled from "styled-components"
import { useLocation } from "react-router-dom"
import music from "../assets/music.mp3"
import {
  useGameDispatchContext,
  useGameStateContext,
} from "../reducer/gameReducer"

const Styles = styled.div`
  display: flex;
  width: 100%;
  padding: 15px 15px;
  z-index: 6;
  font-size: 18px;
  @media screen and (max-width: 550px) {
    justify-content: space-between;
  }
  .tc-button {
    margin-left: 20px;
  }
`

export default function BottomButtons({ ...rest }) {
  const audioRef = React.useRef(null)
  const [audioPlaying, setAudioPlaying] = React.useState(false)
  const location = useLocation()
  const { audio } = useGameStateContext()
  const dispatch = useGameDispatchContext()

  const handleAudio = () => {
    if (!audio) {
      audioRef.current.play()
      dispatch({ type: "UPDATE_AUDIO", audio: 1 })
    } else {
      audioRef.current.pause()
      dispatch({ type: "UPDATE_AUDIO", audio: null })
    }
    setAudioPlaying(!audioPlaying)
  }

  React.useEffect(() => {
    if (audio) {
      audioRef.current.play()
      setAudioPlaying(true)
    } else {
      audioRef.current.pause()
      setAudioPlaying(false)
    }
  }, [audio])

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
          onClick={handleAudio}
        >
          Music {audioPlaying ? "Off" : "On"}
        </button>
        <audio ref={audioRef} loop>
          <source src={music} />
        </audio>
        <a
          href="https://www.penhaligons.com/uk/en/game-official-regulation"
          className="button-alt tc-button"
          style={{
            color: location.pathname === "/play" ? "var(--off-white)" : "black",
          }}
        >
          Open T&Cs
        </a>
      </Styles>
    </>
  )
}
