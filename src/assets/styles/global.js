import { css } from "styled-components";

const global = css`
  body {
    font-family: "Cormorant Garamond", serif;
    font-size: 20px;
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
    padding: 10px 20px;
    display: inline-block;
    transition: all 0.3s ease;
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
`;

export default global;
