import React from "react"
import { useGameStateContext } from "../reducer/gameReducer"

export default function AjaxButton({ setFormSubmitted, ...rest }) {
  const formRef = React.useRef(null)
  const { score, prize } = useGameStateContext()

  const handleFormSubmit = (e) => {
    e.preventDefault()
    setFormSubmitted(true)

    setTimeout(() => {
      formRef.current.submit()
    }, 2000)
  }

  return (
    <>
      <form
        action="https://www.penhaligons.com/uk/en/ajax/truck-game/submit"
        method="post"
        ref={formRef}
        {...rest}
        onSubmit={(e) => handleFormSubmit(e)}
      >
        <input type="hidden" name="userScore" value={score} />
        <input type="hidden" name="userAttempts" value="1" />
        <input type="hidden" name="userPrize" value={prize} />
        <button
          className="button"
          type="submit"
          style={{ margin: 0, textTransform: "uppercase" }}
        >
          Add to bag
        </button>
      </form>
    </>
  )
}
