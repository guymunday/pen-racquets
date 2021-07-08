import React from "react"
import axios from "axios"
import { Switch, BrowserRouter as Router, Route } from "react-router-dom"
import Play from "./components/Play"
import Home from "./components/Home"
import Keen from "./components/Keen"
import Closed from "./components/Closed"
import PrizeReveal from "./components/Prize"
import GameLayout from "./components/GameLayout"
import Leaderboard from "./components/Leaderboard"
import { useGameDispatchContext } from "./reducer/gameReducer"

export default function App() {
  const [loading, setLoading] = React.useState(true)
  const [data, setData] = React.useState({})
  const tries = data?.data?.data?.settings?.total_tries
  const apiUrl = "https://play.penhaligons.com"
  const dispatch = useGameDispatchContext()

  React.useEffect(() => {
    dispatch({ type: "UPDATE_URL", url: apiUrl })
    axios
      .get(`${apiUrl}/api/v1/content`)
      .then((res) => {
        setData(res)
        setLoading(false)
        dispatch({
          type: "UPDATE_GAME_OPEN",
          open: res?.data?.data?.block?.on,
        })
      })
      .catch((error) =>
        console.log(
          "Oh no! There has been an error fetching the content!",
          error
        )
      )
  }, [])

  return (
    <>
      {loading ? (
        <div className="loading-container">
          <h1>Loading...</h1>
        </div>
      ) : (
        <Router>
          <Switch>
            <Route exact path="/">
              <Home data={data} tries={tries} apiUrl={apiUrl} />
            </Route>
            <GameLayout>
              <Route path="/play">
                <Play data={data} tries={tries} apiUrl={apiUrl} />
              </Route>
              <Route path="/results">
                <PrizeReveal data={data} tries={tries} apiUrl={apiUrl} />
              </Route>
              <Route path="/leaderboard">
                <Leaderboard mainData={data} tries={tries} apiUrl={apiUrl} />
              </Route>
              <Route path="/keen">
                <Keen data={data} tries={tries} apiUrl={apiUrl} />
              </Route>
              <Route path="/closed">
                <Closed data={data} tries={tries} apiUrl={apiUrl} />
              </Route>
            </GameLayout>
          </Switch>
        </Router>
      )}
    </>
  )
}
