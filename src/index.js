import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { GlobalProvider } from "./reducer/gameReducer";
import Layout from "./components/Layout";
import { createGlobalStyle } from "styled-components";
import { Helmet } from "react-helmet";
import "./assets/styles/oldGame.css";
import reset from "./assets/styles/reset";
import global from "./assets/styles/global";

const GlobalStyle = createGlobalStyle`
  ${reset}
  ${global}
`;

export default function Root() {
  return (
    <>
      <GlobalStyle />
      <Helmet>
        <title>Penhaligon's Racquets</title>
      </Helmet>
      <GlobalProvider>
        <Layout>
          <App />
        </Layout>
      </GlobalProvider>
    </>
  );
}

ReactDOM.render(<Root />, document.getElementById("root"));
