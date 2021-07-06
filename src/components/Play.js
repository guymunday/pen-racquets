import React from "react";
import styled from "styled-components";
import {
  useGameStateContext,
  useGameDispatchContext,
} from "../reducer/gameReducer";
import { Redirect } from "react-router-dom";
import { useCookies } from "react-cookie";
import gsap from "gsap";
import axios from "axios";
import KeenRedirect from "./KeenRedirect";
import ClosedRedirect from "./ClosedRedirect";
import BottomButtons from "./BottomButtons";

// images
import lemonBall from "../assets/images/lemon.png";
import timerArch from "../assets/images/timer.png";

gsap.config({ nullTargetWarn: false });

const GameStyles = styled.div`
  canvas {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  #texture {
    position: absolute;
    top: 50%;
    left: 50%;
    /* z-index: 5; */
    min-width: 100%;
    min-height: 100%;
    transform: translate(-50%, -50%);
    opacity: 0.2;
    pointer-events: none;
  }
  #crowd-image {
    position: absolute;
    bottom: -1%;
    right: 0;
    width: 110%;
    max-width: 475px;
    pointer-events: none;
    @media screen and (min-width: 1000px) {
      max-width: 600px;
    }
  }
  .game-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    pointer-events: none;
    .timer-arch {
      position: absolute;
      bottom: 90px;
      right: 20px;
      display: block;
      width: 80px;
      @media screen and (max-width: 500px) {
        left: 50%;
        bottom: 68px;
        transform: translate(-50%, 0);
        width: 70px;
      }
    }
    .timer {
      position: absolute;
      bottom: 20px;
      right: 20px;
      background: black;
      color: var(--off-white);
      padding: 10px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 80px;
      height: 80px;
      z-index: 2;
      @media screen and (max-width: 500px) {
        left: 50%;
        bottom: 10px;
        transform: translate(-50%, 0);
        width: 70px;
        height: 70px;
      }
    }
    .timer-banner {
      display: none;
      @media screen and (max-width: 500px) {
        display: block;
        position: absolute;
        bottom: 25px;
        height: 40px;
        background: black;
        right: 10px;
        left: 10px;
      }
    }
    .intro-counter {
      position: absolute;
      color: var(--off-white);
      top: 30%;
      left: 50%;
      transform: translate(-50%, 0);
      font-size: 87px;
    }
    .score-counter {
      position: absolute;
      color: var(--off-white);
      top: 5%;
      left: 50%;
      transform: translate(-50%, 0);
      font-size: 60px;
    }
    .help-text {
      position: absolute;
      bottom: 30%;
      left: 50%;
      transform: translate(-50%, 0);
      max-width: 300px;
    }
    .arrows {
      position: absolute;
      bottom: 17.2%;
      left: 50%;
      transform: translate(-50%, 0);
      width: 300px;
      display: flex;
      justify-content: space-between;
      font-size: 30px;
    }
  }
`;

export default function Play({ data, tries, apiUrl }) {
  const [gameScore, setGameScore] = React.useState(0);
  const [counter, setCounter] = React.useState(3);
  const [timer, setTimer] = React.useState(60);
  const [cookies, setCookie] = useCookies(["tries"]);
  const dispatch = useGameDispatchContext();
  const { score, prize } = useGameStateContext();

  const bronze = data?.data?.data?.settings?.point_bronze;
  const silver = data?.data?.data?.settings?.point_silver;
  const gold = data?.data?.data?.settings?.point_gold;

  const bronzeInStock =
    data?.data?.data?.settings?.stock_bronze > 0 ||
    data?.data?.data?.settings?.stock_bronze_unlimited > 0;

  const silverInStock =
    data?.data?.data?.settings?.stock_silver > 0 ||
    data?.data?.data?.settings?.stock_silver_unlimited > 0;

  const goldInStock =
    data?.data?.data?.settings?.stock_gold > 0 ||
    data?.data?.data?.settings?.stock_gold_unlimited > 0;

  function saveToCookies() {
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0);
    tomorrow.setMinutes(0);
    tomorrow.setMilliseconds(0);

    if (!cookies.tries) {
      setCookie("tries", `${tries - 1}`, { path: "/", expires: tomorrow });
    } else {
      let attempts = parseInt(cookies.tries) - 1;
      setCookie("tries", attempts.toString(), {
        path: "/",
        expires: tomorrow,
      });
    }
  }

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      counter <= 3 && counter > 0 && setCounter(counter - 1);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [counter]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      counter <= 0 && timer > 0 && setTimer(timer - 1);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [counter, timer]);

  React.useEffect(() => {
    if (timer === 0) {
      dispatch({ type: "UPDATE_SCORE", score: gameScore });

      if (gameScore < bronze) {
        dispatch({ type: "UPDATE_PRIZE", prize: "none" });
        dispatch({ type: "UPDATE_PREVIOUS_PRIZE", previous: "none" });
      } else if (gameScore >= bronze && gameScore < silver && bronzeInStock) {
        dispatch({ type: "UPDATE_PRIZE", prize: "PLAY3" });
        dispatch({ type: "UPDATE_PREVIOUS_PRIZE", previous: "PLAY3" });
      } else if (
        (gameScore >= silver && gameScore < gold && silverInStock) ||
        (gameScore >= bronze && gameScore < silver && !bronzeInStock)
      ) {
        dispatch({ type: "UPDATE_PRIZE", prize: "PLAY2" });
        dispatch({ type: "UPDATE_PREVIOUS_PRIZE", previous: "PLAY2" });
      } else if (
        (gameScore >= gold && goldInStock) ||
        (gameScore >= silver && gameScore < gold && !silverInStock)
      ) {
        dispatch({ type: "UPDATE_PRIZE", prize: "PLAY1" });
        dispatch({ type: "UPDATE_PREVIOUS_PRIZE", previous: "PLAY1" });
      }
    }
  }, [timer]);

  React.useEffect(() => {
    gsap.fromTo(
      "#crowd-image",
      {
        yPercent: 100,
      },
      { yPercent: 0 }
    );
  }, []);

  React.useEffect(() => {
    if (timer < 59) {
      gsap.to(".fade-out", {
        duration: 0.4,
        autoAlpha: 0,
      });
    }
  }, [timer]);

  React.useEffect(() => {
    if (timer === 0) {
      gsap.to("#pong", {
        duration: 0.4,
        autoAlpha: 0,
      });

      gsap.to(".score-counter", {
        duration: 0.4,
        autoAlpha: 0,
      });
    }
  }, [timer]);

  React.useEffect(() => {
    if (timer > 0) {
      gsap.to("#pong", {
        duration: 0.4,
        autoAlpha: 1,
      });
    }
  }, [timer]);

  React.useEffect(() => {
    let tl = gsap.timeline();

    if (timer === 0) {
      tl.from(".fade-in", {
        duration: 0.4,
        autoAlpha: 0,
      }).to(".fade-in", {
        delay: 1,
        duration: 0.4,
        autoAlpha: 0,
      });
    }
  }, [timer]);

  function initialiseGame() {
    // select canvas
    const canvas = document.getElementById("pong");
    const ctx = canvas.getContext("2d");
    const ballImage = document.getElementById("ball");

    // create the computer paddle
    const com = {
      x: canvas.width / 2 - 100 / 2,
      y: 0,
      height: 10,
      width: 80,
      color: "#E5E0CE",
      score: 0,
    };

    // create the user paddle
    const user = {
      x: canvas.width / 2 - 100 / 2,
      y: canvas.height - 10,
      height: 10,
      width: 80,
      color: "#E5E0CE",
      score: 0,
    };

    // create the ball
    const ball = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      radius: 10,
      speed: 5,
      velocityX: 5,
      velocityY: 5,
      color: "#E5E0CE",
    };

    // create the net
    const net = {
      x: 0,
      y: canvas.height / 2 - 5,
      width: canvas.width,
      height: 10,
      color: "#E5E0CE",
    };

    // draw the net
    function drawNet() {
      drawRect(net.x, net.y, net.width, net.height, net.color);
    }

    // draw rectangle function
    function drawRect(x, y, w, h, color) {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, w, h);
    }

    // draw circle function
    function drawCircle(x, y, r, color) {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2, false);
      ctx.closePath();
      ctx.fill();
    }

    // draw image for the lemon
    function drawBall(image, x, y) {
      ctx.drawImage(image, x - 15, y - 15, 30, 30);
    }

    function renderGame() {
      // clear the canvas first
      drawRect(0, 0, canvas.width, canvas.height, "#cf9970");

      // draw the net
      drawNet();

      // draw paddles
      drawRect(user.x, user.y, user.width, user.height, user.color);
      drawRect(com.x, com.y, com.width, com.height, com.color);

      drawCircle(ball.x, ball.y, ball.radius, ball.color);
      drawBall(ballImage, ball.x, ball.y);
    }

    // paddle control
    canvas.addEventListener("mousemove", movePaddle);
    canvas.addEventListener("touchmove", movePaddleMobile);

    function movePaddle(e) {
      user.x = e.clientX - window.innerWidth / 2 + user.width * 1.5;
    }

    function movePaddleMobile(e) {
      user.x = e.touches[0].clientX - window.innerWidth / 2 + user.width * 1.5;
    }

    // smooth keyboard control
    const tickRate = 1;
    const keyDown = {};
    const keyMap = {
      ArrowLeft: "ArrowLeft",
      ArrowRight: "ArrowRight",
      a: "a",
      d: "d",
    };

    window.addEventListener("keydown", (e) => {
      keyDown[keyMap[e.key]] = true;
    });

    window.addEventListener("keyup", (e) => {
      keyDown[keyMap[e.key]] = false;
    });

    function tick() {
      if (keyDown["ArrowLeft"]) {
        user.x = user.x - 2;
      } else if (keyDown["ArrowRight"]) {
        user.x = user.x + 2;
      } else if (keyDown["a"]) {
        user.x = user.x - 2;
      } else if (keyDown["d"]) {
        user.x = user.x + 2;
      }
      setTimeout(tick, tickRate);
    }

    tick();

    // collision detection
    function collision(b, p) {
      b.top = b.y - b.radius;
      b.bottom = b.y + b.radius;
      b.left = b.x - b.radius;
      b.right = b.x + b.radius;

      p.top = p.y;
      p.bottom = p.y + p.height;
      p.left = p.x;
      p.right = p.x + p.width;

      return (
        b.right > p.left &&
        b.bottom > p.top &&
        b.left < p.right &&
        b.top < p.bottom
      );
    }

    // reset ball
    function resetBall() {
      ball.x = canvas.width / 2;
      ball.y = canvas.height / 2;

      ball.velocityX = 5;
      ball.velocityY = 5;

      ball.speed = 5;
    }

    // update / logic
    function update() {
      ball.x += ball.velocityX;
      ball.y += ball.velocityY;

      // simple AI to control the computer
      let computerLevel = 0.04;
      com.x += (ball.x - (com.x + com.width / 2)) * computerLevel;

      if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.velocityX = -ball.velocityX;
      }

      let player = ball.y < canvas.width / 2 ? com : user;

      if (collision(ball, player)) {
        // calculate where the ball hit the player
        let collidePoint = ball.x - (player.x + player.width / 2);

        // normalisation
        collidePoint = collidePoint / (player.width / 2);

        // calculate angle in Radian
        let angleRad = (collidePoint * Math.PI) / 4;

        // direction of the ball
        let direction = ball.y < canvas.height / 2 ? 1 : -1;

        // change vel X and Y
        ball.velocityX = direction * ball.speed * Math.sin(angleRad);
        ball.velocityY = direction * ball.speed * Math.cos(angleRad);

        // everytime the ball hits, increase the speed
        ball.speed += 0.9;
      }
      // update the score
      if (ball.y - ball.radius < 0) {
        user.score++;
        setGameScore(user.score);
        resetBall();
        ball.velocityY = -5;
      } else if (ball.y + ball.radius > canvas.height) {
        com.score++;
        resetBall();
        ball.velocityX = -5;
      }
    }

    // game init
    function gameInit() {
      update();
      renderGame();
    }

    // loop the render
    const framesPerSecond = 50;

    setInterval(renderGame, 1000 / framesPerSecond);

    setTimeout(() => {
      setInterval(gameInit, 1000 / framesPerSecond);
    }, 3000);
  }

  function startGame() {
    initialiseGame();
    saveToCookies();
  }

  React.useEffect(() => {
    axios
      .post(`${apiUrl}/api/v1/start`, {
        try: 3,
      })
      .then((res) => {
        dispatch({
          type: "UPDATE_ID",
          id: res.data.data.id,
        });
        startGame();
      })
      .catch((error) => console.log(error));
  }, []);

  if (prize) {
    return <Redirect to="/results" />;
  }

  return (
    <>
      <KeenRedirect />
      <ClosedRedirect />
      <GameStyles>
        <img src={lemonBall} alt="" id="ball" style={{ display: "none" }} />

        <canvas
          id="pong"
          width={300}
          height={400}
          style={{
            touchAction: "none",
            borderLeft: "10px var(--off-white) solid",
            borderRight: "10px var(--off-white) solid",
          }}
        />

        <div className="game-container">
          {timer >= 58 && (
            <h1 className="intro-counter fade-out">
              {counter > 0 ? counter : "PLAY!"}
            </h1>
          )}
          {timer < 60 && (
            <h1 className="score-counter">{timer > 0 ? gameScore : score}</h1>
          )}
          <img className="timer-arch" src={timerArch} alt="" />
          <h1 className="timer">
            <span>{timer}</span>
          </h1>
          <div className="timer-banner" />
          {timer >= 58 && (
            <>
              <p className="help-text fade-out">
                {data?.data?.data?.settings?.arrow_text}
              </p>
              <div className="arrows fade-out">
                <span>←</span>
                <span>→</span>
              </div>
            </>
          )}
        </div>
        <BottomButtons />
      </GameStyles>
    </>
  );
}
