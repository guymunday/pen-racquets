import { css } from "styled-components";

const global = css`
  :root {
    --off-white: #e5e0ce;
  }

  body {
    font-family: "Cormorant Garamond", serif;
    font-size: 20px;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: "Canopee", serif;
    font-weight: 400;
    line-height: 1;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  img {
    display: block;
    object-fit: cover;
    width: 100%;
  }

  .button {
    border: 1px solid black;
    padding: 8px 20px;
    display: inline-block;
    transition: all 0.3s ease;
    font-family: inherit;
    font-size: inherit;
    background: rgba(255, 255, 255, 0.2);
    outline: none;
    cursor: pointer;
    min-width: 250px;
    text-align: center;
    text-transform: uppercase;
    :hover {
      background: black;
      color: white;
    }
  }

  .button-alt {
    background: none;
    border: none;
    outline: none;
    padding: 0;
    margin: 0;
    text-transform: none;
    display: inline-block;
    font-family: inherit;
    font-size: inherit;
    cursor: pointer;
    text-decoration: underline;
  }

  .loading-container {
    text-align: center;
    position: relative;
    min-height: 650px;
    overflow: hidden;
    background-color: #ebd668;
  }

  .game-loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  input[type="text"] {
    background: transparent;
    outline: none;
    border: none;
    border-bottom: 1px solid black;
    margin-bottom: 10px;
    width: 100%;
    padding: 10px 0;
    text-align: center;
    font-size: 1rem;
    :focus {
      background: transparent;
    }
    ::placeholder {
      color: inherit;
      margin: auto;
      padding: 0;
      text-align: center;
      font-size: 1rem;
    }
  }

  .cart-image {
    max-width: 120px !important;
    margin: 20px auto !important;
  }
`;

export default global;
