import React from "react";
import styled from "styled-components";
import {
  useGameStateContext,
  useGameDispatchContext,
} from "../reducer/gameReducer";
import { Redirect } from "react-router-dom";

// images
import lemonBall from "../assets/images/lemon.png";

const GameStyles = styled.div`
  background-color: #cf9970;
  width: 100%;
  position: relative;
  min-height: 500px;
  canvas {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export default function Game({ data }) {
  const [gameScore, setGameScore] = React.useState(0);
  const [hasTimedOut, setHasTimedOut] = React.useState(false);

  const dispatch = useGameDispatchContext();
  const { id, score } = useGameStateContext();

  const initialiseGame = () => {
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
      coilor: "#E5E0CE",
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

    // draw text
    function drawText(text, x, y, color) {
      ctx.fillStyle = color;
      ctx.font = "45px system";
      ctx.fillText(text, x, y);
    }

    function renderGame() {
      // clear the canvas first
      drawRect(0, 0, canvas.width, canvas.height, "#cf9970");

      // draw the net
      drawNet();

      // draw the scores
      drawText(user.score, canvas.width / 2, canvas.height / 5, "white");
      // drawText(com.score, (3 * canvas.width) / 4, canvas.height / 5, "white");

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

      ball.speed = 5;
      ball.velocityY = -ball.velocityY;
    }

    // update / logic
    function update() {
      ball.x += ball.velocityX;
      ball.y += ball.velocityY;

      // simple AI to control the computer
      let computerLevel = 0.03;
      com.x += (ball.x - (com.x + com.width / 2)) * computerLevel;

      if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.velocityX = -ball.velocityX;
      }

      let player = ball.y < canvas.width / 2 ? com : user;

      if (collision(ball, player)) {
        // ball.velocityY = -ball.velocityY;
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
        ball.speed += 0.6;
      }
      // update the score
      if (ball.y - ball.radius < 0) {
        user.score++;
        setGameScore(user.score);
        resetBall();
      } else if (ball.y + ball.radius > canvas.height) {
        com.score++;
        resetBall();
      }
    }

    // game init
    function gameInit() {
      update();
      renderGame();
    }

    // loop the render
    const framesPerSecond = 50;
    setInterval(gameInit, 1000 / framesPerSecond);
  };

  React.useEffect(() => {
    id && initialiseGame();
  }, []);

  if (!id) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <GameStyles>
        <img src={lemonBall} alt="" id="ball" style={{ display: "none" }} />
        <canvas
          id="pong"
          width={300}
          height={400}
          style={{ touchAction: "none" }}
        />
      </GameStyles>
    </>
  );
}
