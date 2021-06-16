import React from "react";
import axios from "axios";

export default function Game() {
  axios
    .get("https://penhaligons.wildishandco.co.uk/api/v1/content")
    .then((res) => console.log(res))
    .catch((error) => console.log("Oh no! There has been an error!", error));

  const initialiseGame = () => {
    // select canvas
    const canvas = document.getElementById("pong");
    const ctx = canvas.getContext("2d");

    // create the computer paddle
    const com = {
      x: canvas.width / 2 - 100 / 2,
      y: 0,
      height: 10,
      width: 100,
      color: "white",
      score: 0,
    };

    // create the user paddle
    const user = {
      x: canvas.width / 2 - 100 / 2,
      y: canvas.height - 10,
      height: 10,
      width: 100,
      color: "white",
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
      coilor: "white",
    };

    // create the net
    const net = {
      x: 0,
      y: canvas.height / 2 - 1,
      width: canvas.width,
      height: 2,
      color: "white",
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

    // draw text
    function drawText(text, x, y, color) {
      ctx.fillStyle = color;
      ctx.font = "45px fantasy";
      ctx.fillText(text, x, y);
    }

    function renderGame() {
      // clear the canvas first
      drawRect(0, 0, canvas.width, canvas.height, "orange");

      // draw the net
      drawNet();

      // draw the scores
      drawText(user.score, canvas.width / 4, canvas.height / 5, "white");
      drawText(com.score, (3 * canvas.width) / 4, canvas.height / 5, "white");

      // draw paddles
      drawRect(user.x, user.y, user.width, user.height, user.color);
      drawRect(com.x, com.y, com.width, com.height, com.color);

      drawCircle(ball.x, ball.y, ball.radius, ball.color);
    }

    // paddle control
    canvas.addEventListener("mousemove", movePaddle);
    canvas.addEventListener("touchmove", movePaddleMobile);

    function movePaddle(e) {
      user.x = e.clientX - user.width / 2;
    }

    function movePaddleMobile(e) {
      user.x = e.touches[0].clientX - user.width / 2;
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
      let computerLevel = 0.8;
      com.x += ball.x - (com.x + com.width / 2) * computerLevel;

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
        ball.speed += 0.5;
      }
      // update the score
      if (ball.y - ball.radius < 0) {
        com.score++;
        resetBall();
      } else if (ball.y + ball.radius > canvas.height) {
        user.score++;
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
    initialiseGame();
  }, []);

  return (
    <>
      <div>Ping pong</div>
      <canvas id="pong" width={300} height={500} />
    </>
  );
}
