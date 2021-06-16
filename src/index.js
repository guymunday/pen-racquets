import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { GlobalProvider } from "./reducer/gameReducer";

export default function Root() {
  return (
    <>
      <React.StrictMode>
        <GlobalProvider>
          <App />
        </GlobalProvider>
      </React.StrictMode>
    </>
  );
}

ReactDOM.render(<Root />, document.getElementById("root"));
