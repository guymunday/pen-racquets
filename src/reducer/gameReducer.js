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
    case "UPDATE_BRONZE_PRIZE": {
      return {
        ...state,
        bronzePrize: action.prize,
      };
    }
    case "UPDATE_SILVER_PRIZE": {
      return {
        ...state,
        silverPrize: action.prize,
      };
    }
    case "UPDATE_GOLD_PRIZE": {
      return {
        ...state,
        goldPrize: action.first,
      };
    }
    case "UPDATE_AUDIO": {
      return {
        ...state,
        audio: action.audio,
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
