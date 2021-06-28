import * as React from "react";
import { createContext, useReducer, useContext } from "react";

let initialGameContext = {};

const GameStateContext = createContext(initialGameContext);
const GameDispatchContext = createContext();

const gameReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_ID": {
      return {
        ...state,
        id: action.id,
      };
    }
    case "UPDATE_SCORE": {
      return {
        ...state,
        score: action.score,
      };
    }
    case "UPDATE_PRIZE": {
      return {
        ...state,
        prize: action.prize,
      };
    }
    case "UPDATE_PREVIOUS_PRIZE": {
      return {
        ...state,
        previous: action.previous,
      };
    }
    case "UPDATE_GAME_OPEN": {
      return {
        ...state,
        open: action.open,
      };
    }
    case "UPDATE_SUBMITTED": {
      return {
        ...state,
        submitted: action.submitted,
      };
    }
    case "UPDATE_AUDIO": {
      return {
        ...state,
        audio: action.audio,
      };
    }
    case "UPDATE_URL": {
      return {
        ...state,
        url: action.url,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialGameContext);

  return (
    <GameDispatchContext.Provider value={dispatch}>
      <GameStateContext.Provider value={state}>
        {children}
      </GameStateContext.Provider>
    </GameDispatchContext.Provider>
  );
};

export const useGameStateContext = () => useContext(GameStateContext);
export const useGameDispatchContext = () => useContext(GameDispatchContext);
