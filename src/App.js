import React from "react";
import axios from "axios";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Game from "./components/Game";
import Home from "./components/Home";

export default function App() {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState({});
  const tries = data?.data?.data?.settings?.total_tries;

  React.useEffect(() => {
    axios
      .get("https://penhaligons.wildishandco.co.uk/api/v1/content")
      .then((res) => {
        setData(res);
        setTimeout(() => {
          setLoading(false);
        }, 500);
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
      {loading && <h1>Loading...</h1>}
      {!loading && (
        <Router>
          <Switch>
            <Route exact path="/">
              <Home data={data} tries={tries} />
            </Route>
            <Route path="/play">
              <Game data={data} tries={tries} />
            </Route>
          </Switch>
        </Router>
      )}
    </>
  );
}
