import React from "react";

import ukimage from "../assets/images/old-game/uk.png";
import usimage from "../assets/images/old-game/us_0.png";
import sauimage from "../assets/images/old-game/sau_0.png";
import aeimage from "../assets/images/old-game/ae_0.png";
export default class Footer extends React.Component {
  render() {
    return (
      <footer>
        <div className="container footer-principal">
          <div className="row row-space">
            <div className="col-xs-12 col-lg-3">
              <div className="box-field-register-checkout">
                <label className="hide" htmlFor="site-selector-selector">
                  Site selector
                </label>
                <div className="footerlanguageselect">
                  <select
                    id="site-selector-selector"
                    name="site-selector-selector"
                    defaultValue=""
                    className="site-selector select2-hidden-accessible"
                    data-select2-id="site-selector-selector"
                    tabIndex="-1"
                    aria-hidden="true"
                  >
                    <option
                      aria-checked="true"
                      value="https://www.penhaligons.com/uk/en"
                      data-image="/sites/default/files/2020-07/uk.png"
                      data-select2-id="4"
                    >
                      United Kingdom
                    </option>
                    <option
                      value="https://www.penhaligons.com/us/en"
                      data-image="/sites/default/files/2020-07/us_0.png"
                    >
                      United States
                    </option>
                    <option
                      value="https://www.penhaligons.ae"
                      data-image="/sites/default/files/2020-07/ae_0.png"
                    >
                      United Arab Emirates
                    </option>
                    <option
                      value="https://www.penhaligons.sa"
                      data-image="/sites/default/files/2020-07/sau_0.png"
                    >
                      Saudi Arabia
                    </option>
                  </select>
                  <span
                    className="footerselectcustom select2 select2-container select2-container--default"
                    dir="ltr"
                    data-select2-id="3"
                  >
                    <span className="selection">
                      <span
                        className="select2-selection select2-selection--single"
                        aria-haspopup="true"
                        aria-expanded="false"
                        tabIndex="0"
                        aria-disabled="false"
                        aria-labelledby="select2-site-selector-selector-container"
                      >
                        <span
                          className="select2-selection__rendered"
                          id="select2-site-selector-selector-container"
                          role="textbox"
                          aria-readonly="true"
                          title="United Kingdom"
                        >
                          <span>
                            <img
                              className="footercountry"
                              alt="United Kingdom"
                              src={ukimage}
                            />
                            United Kingdom
                          </span>
                        </span>
                        <span
                          className="select2-selection__arrow"
                          role="presentation"
                        >
                          <b role="presentation"></b>
                        </span>
                      </span>
                    </span>
                    <span
                      className="dropdown-wrapper"
                      aria-hidden="true"
                    ></span>
                  </span>
                  <ul
                    className="select2-results__options"
                    role="listbox"
                    id="select2-site-selector-selector-results"
                    aria-expanded="true"
                    aria-hidden="false"
                  >
                    <li
                      className="select2-results__option selected"
                      id="select2-site-selector-selector-result-aux2-https://www.penhaligons.com/uk/en"
                      role="option"
                      aria-selected="true"
                      data-select2-id="select2-site-selector-selector-result-aux2-https://www.penhaligons.com/uk/en"
                    >
                      <span>
                        <img
                          className="footercountry"
                          alt="United Kingdom"
                          src={ukimage}
                        />
                        United Kingdom
                      </span>
                    </li>
                    <li
                      className="select2-results__option"
                      id="select2-site-selector-selector-result-56e3-https://www.penhaligons.com/us/en"
                      role="option"
                      aria-selected="false"
                      data-select2-id="select2-site-selector-selector-result-56e3-https://www.penhaligons.com/us/en"
                    >
                      <span>
                        <img
                          className="footercountry"
                          alt="United States"
                          src={usimage}
                        />
                        United States
                      </span>
                    </li>
                    <li
                      className="select2-results__option select2-results__option--highlighted"
                      id="select2-site-selector-selector-result-xmjo-https://www.penhaligons.ae"
                      role="option"
                      aria-selected="false"
                      data-select2-id="select2-site-selector-selector-result-xmjo-https://www.penhaligons.ae"
                    >
                      <span>
                        <img
                          className="footercountry"
                          alt="United Arab Emirates"
                          src={aeimage}
                        />
                        United Arab Emirates
                      </span>
                    </li>
                    <li
                      className="select2-results__option"
                      id="select2-site-selector-selector-result-qis5-https://www.penhaligons.sa"
                      role="option"
                      aria-selected="false"
                      data-select2-id="select2-site-selector-selector-result-qis5-https://www.penhaligons.sa"
                    >
                      <span>
                        <img
                          className="footercountry"
                          alt="Saudi Arabia"
                          src={sauimage}
                        />
                        Saudi Arabia
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="socialiconsaccess-content">
                <div>
                  <span className="addtoany_list">
                    <a
                      href="https://www.instagram.com/penhaligons_london"
                      target="_blank"
                      title="Share Instagram"
                      rel="noreferrer"
                    >
                      <span className="visually-hidden">Share Instagram</span>
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a
                      href="https://www.facebook.com/Penhaligons"
                      target="_blank"
                      title="Share facebook"
                      rel="noreferrer"
                    >
                      <span className="visually-hidden">Share facebook</span>
                      <i className="fab fa-facebook"></i>
                    </a>
                    <a
                      href="https://twitter.com/PenhaligonsLtd"
                      target="_blank"
                      title="Share Twitter"
                      rel="noreferrer"
                    >
                      <span className="visually-hidden">Share Twitter</span>
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a
                      href="https://www.pinterest.co.uk/penhaligons"
                      target="_blank"
                      title="Share Pinterest"
                      rel="noreferrer"
                    >
                      <span className="visually-hidden">Share Pinterest</span>
                      <i className="fab fa-pinterest-p"></i>
                    </a>
                  </span>
                </div>
                <span></span>
              </div>
            </div>
            <div className="col-xs-12 col-lg-3">
              <div className="services-footer">
                <h3 data-show="#services-footer-footer-collapsed">
                  Services<span className="accordion-arrow-footer"></span>
                </h3>
                <div
                  id="services-footer-footer-collapsed"
                  className="footer-collapsed"
                >
                  <ul>
                    <li>
                      <span>
                        {" "}
                        <a
                          target="_blank"
                          href="https://www.penhaligons.com/uk/en/support/contact"
                          title="Contact"
                          data-drupal-link-system-path="node/16"
                          rel="noreferrer"
                        >
                          Contact
                        </a>{" "}
                      </span>
                    </li>

                    <li>
                      <span>
                        {" "}
                        <a
                          target="_blank"
                          href="https://www.penhaligons.com/uk/en/blog/live-video-fragrance-consultation"
                          title="Book a Consultation"
                          data-drupal-link-system-path="node/119"
                          rel="noreferrer"
                        >
                          Book a Consultation
                        </a>{" "}
                      </span>
                    </li>

                    <li>
                      <span>
                        {" "}
                        <a
                          target="_blank"
                          href="https://www.penhaligons.com/uk/en/support/delivery"
                          title="Delivery"
                          data-drupal-link-system-path="node/17"
                          rel="noreferrer"
                        >
                          Delivery
                        </a>{" "}
                      </span>
                    </li>

                    <li>
                      <span>
                        {" "}
                        <a
                          target="_blank"
                          href="https://www.penhaligons.com/uk/en/support/returns"
                          title="Returns"
                          data-drupal-link-system-path="node/18"
                          rel="noreferrer"
                        >
                          Returns
                        </a>{" "}
                      </span>
                    </li>

                    <li>
                      <span>
                        {" "}
                        <a
                          target="_blank"
                          href="https://www.penhaligons.com/uk/en/support/faqs"
                          title="Faqs"
                          data-drupal-link-system-path="node/10"
                          rel="noreferrer"
                        >
                          Faqs
                        </a>{" "}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-lg-3">
              <div className="about-us-footer">
                <h3 data-show="#about-us-footer-footer-collapsed">
                  About Us<span className="accordion-arrow-footer"></span>
                </h3>
                <div
                  id="about-us-footer-footer-collapsed"
                  className="footer-collapsed"
                >
                  <ul>
                    <li>
                      <span>
                        {" "}
                        <a
                          target="_blank"
                          href="https://www.penhaligons.com/uk/en/penhaligons-perks"
                          title="Penhaligon's Perks"
                          data-drupal-link-system-path="node/70"
                          rel="noreferrer"
                        >
                          Penhaligon's Perks
                        </a>{" "}
                      </span>
                    </li>
                    <li>
                      <span>
                        {" "}
                        <a
                          target="_blank"
                          href="https://www.penhaligons.com/uk/en/heritage"
                          title="Heritage"
                          data-drupal-link-system-path="node/73"
                          rel="noreferrer"
                        >
                          Heritage
                        </a>{" "}
                      </span>
                    </li>
                    <li>
                      <span>
                        {" "}
                        <a
                          target="_blank"
                          href="https://www.penhaligons.com/uk/en/stores"
                          title="Stores"
                          data-drupal-link-system-path="stores"
                          rel="noreferrer"
                        >
                          Stores
                        </a>{" "}
                      </span>
                    </li>
                    <li>
                      <span>
                        {" "}
                        <a
                          target="_blank"
                          href="https://www.penhaligons.com/uk/en/carrers"
                          title="Careers"
                          data-drupal-link-system-path="node/75"
                          rel="noreferrer"
                        >
                          Careers
                        </a>{" "}
                      </span>
                    </li>
                    <li>
                      <span>
                        {" "}
                        <a
                          target="_blank"
                          href="https://www.penhaligons.com/uk/en/governance"
                          title="Governance"
                          data-drupal-link-system-path="node/72"
                          rel="noreferrer"
                        >
                          Governance
                        </a>{" "}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-lg-3">
              <div className="profiling-footer">
                <h3 data-show="#profiling-footer-footer-collapsed">
                  Fragrance Profiling
                  <span className="accordion-arrow-footer"></span>
                </h3>
                <div
                  id="profiling-footer-footer-collapsed"
                  className="footer-collapsed pb-10"
                >
                  <p>
                    To go out without perfume? Why, it’s unthinkable! Answer a
                    few questions to find your signature scent
                  </p>
                  <a
                    target="_blank"
                    href="https://www.penhaligons.com/uk/en/fragrance-profiling"
                    title="Find your perfect fragrance"
                    className="find-proyect"
                    data-drupal-link-system-path="fragrance-profiling"
                    rel="noreferrer"
                  >
                    Find your perfect fragrance
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="row row-space second-footer">
            <div className="col-xs-12 col-lg-9">
              <ul>
                <li>
                  <a
                    target="_blank"
                    href="https://www.penhaligons.com/uk/en/terms-conditions"
                    title="Terms &amp; Conditions"
                    data-drupal-link-system-path="node/8"
                    rel="noreferrer"
                  >
                    Terms &amp; Conditions
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://www.penhaligons.com/uk/en/terms-policy/privacy-policy"
                    title="Privacy Policy"
                    data-drupal-link-system-path="node/11"
                    rel="noreferrer"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://www.penhaligons.com/uk/en/terms-website-use"
                    title="Terms of Website Use"
                    data-drupal-link-system-path="node/12"
                    rel="noreferrer"
                  >
                    Terms of Website Use
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://www.penhaligons.com/uk/en/terms-policy/cookie-policy"
                    title="Cookie Policy"
                    data-drupal-link-system-path="node/13"
                    rel="noreferrer"
                  >
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://www.penhaligons.com/uk/en/terms-policy/returns-refunds"
                    title="Returns &amp; Refunds"
                    data-drupal-link-system-path="node/14"
                    rel="noreferrer"
                  >
                    Returns &amp; Refunds
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-xs-12 col-lg-3">
              <p>© 2021 Penhaligon's Ltd</p>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
