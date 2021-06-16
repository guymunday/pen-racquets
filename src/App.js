import { createGlobalStyle } from "styled-components";
import Layout from "./components/Layout";
import "./assets/styles/oldGame.css";
import reset from "./assets/styles/reset";
import global from "./assets/styles/global";
import Game from "./components/Game";

const GlobalStyle = createGlobalStyle`
  ${reset}
  ${global}
`;

export default function App() {
  return (
    <>
      <GlobalStyle />
      <Layout>
        <Game />
      </Layout>
    </>
  );
}
