import { css } from "styled-components";

const global = css`
  :root {
    --offwhite: #f8f8ec;
  }

  main {
    font-family: "TTBarrels";
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

  img.swirl {
    width: 50%;
    margin: 20px auto;
  }

  button,
  .button {
    background: transparent;
    font-family: "TTBarrels";
    outline: none;
    font-size: 1rem;
    border: 1px solid #000;
    transition: 0.3s ease;
    width: 100%;
    padding: 15px;
    display: inline-block;
    text-transform: uppercase;
    cursor: pointer;
    :hover {
      background: #000;
      color: white;
    }
  }

  .button-alt {
    position: relative;
    display: inline-block;
    background: transparent;
    font-family: "TTBarrels";
    outline: none;
    font-size: 1rem;
    border: 1px solid #fff;
    transition: 0.3s ease;
    color: #fff;
    padding: 15px;
    width: 100%;
    text-transform: uppercase;
    cursor: pointer;
    :hover {
      background: #fff;
      color: #000;
    }
  }
`;

export default global;
