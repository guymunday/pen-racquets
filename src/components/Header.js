import React from "react";
import altlogo from "../assets/images/old-game/alternative-penhaligons-logo.svg";
import logo from "../assets/images/old-game/logo.svg";
import account from "../assets/images/old-game/account.svg";
import bag from "../assets/images/old-game/bag.svg";

export default class Header extends React.Component {
  render() {
    return (
      <>
        <header>
          <div className="container-header">
            <div className="row visible-sm visible-xs wrapper-mobile-header">
              <div className="col-xs-3">
                <img
                  className="b-lazy img-fluid header-icons login-link b-error"
                  data-account-url="https://www.penhaligons.com/uk/en/my-account/personal-details"
                  src={account}
                  alt="account"
                />
              </div>
              <div className="col-xs-6">
                <a
                  target="_blank"
                  href="https://www.penhaligons.com/uk/en"
                  title="Penhaligons"
                  rel="noreferrer"
                >
                  <img
                    className="b-lazy img-fluid header-mobile-logo b-error"
                    src={altlogo}
                    alt="mobile logo penhaligons"
                  />
                </a>
              </div>
              <div className="col-xs-3">
                <a
                  target="_blank"
                  href="https://www.penhaligons.com/uk/en"
                  data-destination=".inside-right-menu.bag-menu"
                  title="bag"
                  rel="noreferrer"
                >
                  <img
                    className="b-lazy img-fluid header-icons bag-mobile-logo bag-link b-error"
                    src={bag}
                    alt="bag"
                  />
                </a>
                <span className="bag-summ add-num-items">
                  <span className="summ dnone"></span>
                </span>
              </div>
            </div>
            <div className="row header-space">
              <div className="col-xs-12 col-lg-4 left-menu hidden-sm hidden-xs">
                <ul className="primary-menu">
                  <li
                    className="shop-link"
                    data-destination=".inside-left-menu.shop-menu"
                  >
                    <a
                      target="_blank"
                      href="https://www.penhaligons.com/uk/en"
                      title="Shop"
                      rel="noreferrer"
                    >
                      Shop
                    </a>
                  </li>
                  <li
                    className="explore-link"
                    data-destination=".inside-left-menu.explore-menu"
                  >
                    <a
                      target="_blank"
                      href="https://www.penhaligons.com/uk/en"
                      title="Explore"
                      rel="noreferrer"
                    >
                      Explore
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      href="https://www.penhaligons.com/uk/en/stores"
                      title="Stores"
                      rel="noreferrer"
                    >
                      Stores
                    </a>
                  </li>
                </ul>
              </div>

              <div className="col-sm-4 hidden-sm hidden-xs">
                <a
                  target="_blank"
                  className="header-logoa"
                  href="https://www.penhaligons.com/uk/en"
                  title="penhaligons"
                  rel="noreferrer"
                >
                  <img className="header-logo img-fluid" src={logo} alt="" />
                </a>
              </div>

              <div className="col-sm-4 hidden-sm hidden-xs right-menu">
                <ul className="primary-menu">
                  <li className="search-link" data-destination="#window-search">
                    <a
                      target="_blank"
                      href="https://www.penhaligons.com/uk/en"
                      title="Search"
                      rel="noreferrer"
                    >
                      Search
                    </a>
                  </li>
                  <li
                    data-account-url="https://www.penhaligons.com/uk/en/my-account/personal-details"
                    className="login-link"
                  >
                    <a
                      target="_blank"
                      href="https://www.penhaligons.com/uk/en"
                      title="Account"
                      rel="noreferrer"
                    >
                      Account
                    </a>
                  </li>
                  <li
                    className="bag-link"
                    data-destination=".inside-right-menu.bag-menu"
                  >
                    <a
                      target="_blank"
                      href="https://www.penhaligons.com/uk/en"
                      className="cart-number"
                      title="Bag"
                      rel="noreferrer"
                    >
                      <span className="bag">
                        BAG
                        <span className="add-num-items">
                          <span className="summ dnone"></span>
                        </span>
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="visible-sm visible-xs hidden-md hidden-lg col-xs-12 col-lg-4 left-menu">
                <ul className="primary-menu">
                  <li
                    className="shop-link"
                    data-destination=".inside-left-menu.shop-menu"
                  >
                    <a
                      target="_blank"
                      href="https://www.penhaligons.com/uk/en"
                      title="Shop"
                      rel="noreferrer"
                    >
                      Shop
                    </a>
                  </li>
                  <li
                    className="explore-link"
                    data-destination=".inside-left-menu.explore-menu"
                  >
                    <a
                      target="_blank"
                      href="https://www.penhaligons.com/uk/en"
                      title="Explore"
                      rel="noreferrer"
                    >
                      Explore
                    </a>
                  </li>
                  <li className="search-link" data-destination="#window-search">
                    <a
                      target="_blank"
                      href="https://www.penhaligons.com/uk/en"
                      title="Search"
                      rel="noreferrer"
                    >
                      Search
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </header>
      </>
    );
  }
}
