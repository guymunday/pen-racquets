import React from "react";
import axios from "axios";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Play from "./components/Play";
import Home from "./components/Home";
import PrizeReveal from "./components/Prize";
import Transition from "./components/Transition";
import GameLayout from "./components/GameLayout";

export default function App() {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState({});
  const tries = data?.data?.data?.settings?.total_tries;
  const apiUrl = "https://penhaligons.wildishandco.co.uk";

  React.useEffect(() => {
    axios
      .get(`${apiUrl}/api/v1/content`)
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((error) =>
        console.log(
          "Oh no! There has been an error fetching the content!",
          error
        )
      );
  }, []);

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
            </GameLayout>
          </Switch>
        </Router>
      )}
    </>
  );
}
