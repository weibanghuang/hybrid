import React, { useRef, useEffect } from "react";

function Canvas(props) {
  const canvasRef = useRef(null);

  useEffect(() => {
    let canvas = canvasRef.current;
    let pdf_height = 90 + 15 * props.navbarpdf.length;
    if (pdf_height < 300) {
      pdf_height = 300;
    }
    canvas.width = 300;
    canvas.height = pdf_height;
    let context = canvas.getContext("2d");

    //Our first draw
    context.fillStyle = "#f6f6f6";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Rectangle
    context.strokeStyle = "#141414";
    context.beginPath();
    context.roundRect(4, 4, canvas.width - 8, canvas.height - 12, 8);
    context.stroke();

    context.save();
    context.globalAlpha = 0.5;
    let temp_size = Math.floor(Math.random() * 50) + 110;
    context.strokeStyle = "#ff6961";
    context.fillStyle = "#ff6961";
    context.beginPath();
    context.roundRect(
      Math.floor(Math.random() * (300 - temp_size)) + 1,
      Math.floor(Math.random() * (pdf_height - temp_size)) + 1,
      temp_size,
      temp_size,
      8
    );
    context.stroke();
    context.fill();
    context.strokeStyle = "#93e9be";
    context.fillStyle = "#93e9be";
    context.beginPath();
    context.roundRect(
      Math.floor(Math.random() * (300 - temp_size)) + 1,
      Math.floor(Math.random() * (pdf_height - temp_size)) + 1,
      temp_size,
      temp_size,
      8
    );
    context.stroke();
    context.fill();
    context.strokeStyle = "#abd7eb";
    context.fillStyle = "#abd7eb";
    context.beginPath();
    context.roundRect(
      Math.floor(Math.random() * (300 - temp_size)) + 1,
      Math.floor(Math.random() * (pdf_height - temp_size)) + 1,
      temp_size,
      temp_size,
      8
    );
    context.stroke();
    context.fill();

    context.restore();

    context.fillStyle = "#141414";
    context.strokeStyle = "#141414";
    context.font = "23px Courier";
    context.strokeText("Hybrid Trainings", 8, 23);
    context.font = "10px Courier";
    context.fillText(
      "https://weibanghuang.github.io/hybrid",
      8,
      pdf_height - 13
    );
    let dateObj = new Date();
    let month = dateObj.getMonth() + 1; //months from 1-12
    let day = dateObj.getDate();
    let year = dateObj.getFullYear();

    let newdate = year + "-" + month + "/" + day;
    context.font = "23px Courier";
    context.strokeText(newdate, 8, 45);
    context.font = "15px Courier";
    // let base_image = new Image();
    // base_image.src = "hybrid.png";
    // base_image.onload = function () {
    //   context.drawImage(base_image, 251, pdf_height - 49, 30, 30);
    //   context.drawImage(base_image, 251, 7, 30, 30);
    // };
    context.fillStyle = "141414";
    let temp = "";
    let temp_height = 70;
    for (let i in props.navbarpdf) {
      context.fillText(
        props.navbarpdf[i].name +
          " " +
          props.navbarpdf[i].rep +
          "rep " +
          props.navbarpdf[i].weight +
          "£",
        8,
        temp_height
      );
      temp_height += 15;
    }
  }, [props.navbarpdf]);

  return <canvas ref={canvasRef} {...props} />;
}

export default Canvas;
