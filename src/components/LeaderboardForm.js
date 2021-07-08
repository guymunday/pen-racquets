import React from "react"
import styled from "styled-components"
import axios from "axios"
import { Redirect } from "react-router-dom"
import { useGameStateContext } from "../reducer/gameReducer"
import Popup from "./Popup"
import { badWords } from "../assets/bad-words"
import tennisPlayer from "../assets/images/tennis-player.png"

const StyledLeaderboardForm = styled.div`
  position: relative;
  > * {
    margin-bottom: 20px;
  }
  .form-close-button {
    position: absolute;
    top: -30%;
    right: -8%;
    font-size: 2rem;
    font-weight: 300;
    padding: 10px;
    line-height: 1;
    background: none;
    outline: none;
    border: none;
    cursor: pointer;
  }
  .form-image {
    display: block;
    position: absolute;
    top: -72%;
    left: 30%;
    width: 180px;
  }
`

export default function LeaderboardForm({ data }) {
  const [formSubmitted, setFormSubmitted] = React.useState(false)
  const [shouldRedirect, setShouldRedirect] = React.useState(false)
  const [formBlocked, setFormBlocked] = React.useState(
    data?.data?.data?.result?.top_placeholder
  )
  const [initial, setInitial] = React.useState("")
  const { id, url, score } = useGameStateContext()

  function handleSubmit(e) {
    e.preventDefault()

    axios
      .post(`${url}/api/v1/leaderboard`, {
        id,
        initial,
      })
      .then((res) => {
        setFormSubmitted(true)
        setShouldRedirect(true)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function handleOnChange(e) {
    if (badWords.indexOf(e.target.value) > -1) {
      setInitial("")
      setFormBlocked("No bad language!")
    } else {
      setInitial(e.target.value)
      setFormBlocked(data?.data?.data?.result?.top_placeholder)
    }
  }

  function handleReturnButton() {
    setFormSubmitted(true)
  }

  if (shouldRedirect) {
    return <Redirect to="/leaderboard" />
  }

  return (
    <>
      {!formSubmitted && (
        <Popup>
          <StyledLeaderboardForm>
            <button className="form-close-button" onClick={handleReturnButton}>
              &times;
            </button>
            <img className="form-image" src={tennisPlayer} alt="" />
            <div>
              <h1 style={{ fontSize: 60, marginTop: 100 }}>{score}</h1>
              <h2>{data?.data?.data?.result?.top_title}</h2>
            </div>
            <p>{data?.data?.data?.result?.top_text}</p>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                maxLength="3"
                minLength="1"
                value={initial}
                name="initials"
                onChange={handleOnChange}
                placeholder={formBlocked}
              />

              <button
                className="button"
                type="submit"
                style={{ width: "100%", margin: 0 }}
              >
                {data?.data?.data?.result?.top_submit}
              </button>
            </form>
            <button className="button" onClick={handleReturnButton}>
              {data?.data?.data?.result?.top_return}
            </button>
          </StyledLeaderboardForm>
        </Popup>
      )}
    </>
  )
}
