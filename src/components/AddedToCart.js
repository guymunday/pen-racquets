import React from "react";
import { useGameStateContext } from "../reducer/gameReducer";
import Popup from "./Popup";

export default function AddedToCart({ data, terms }) {
  const { prize } = useGameStateContext();
  console.log(data?.data?.data);

  return (
    <>
      <Popup>
        {prize === "PLAY3" ? (
          <img
            className="cart-image"
            src={data?.data?.data?.result?.bronze_image?.url}
            alt=""
            style={{ maxWidth: 200, margin: "inherit auto" }}
          />
        ) : prize === "PLAY2" ? (
          <img
            className="cart-image"
            src={data?.data?.data?.result?.silver_image?.url}
            alt=""
            style={{ maxWidth: 200, margin: "inherit auto" }}
          />
        ) : (
          <img
            className="cart-image"
            src={data?.data?.data?.result?.gold_image?.url}
            alt=""
            style={{ maxWidth: 200, margin: "inherit auto" }}
          />
        )}
        <h1>{data?.data?.data?.cart?.above_text}</h1>
        <p>{data?.data?.data?.cart?.button_text}</p>
        <p>
          <a href="/" style={{ fontSize: 16 }}>
            {terms}
          </a>
        </p>
      </Popup>
    </>
  );
}
