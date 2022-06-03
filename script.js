const truck = new Audio("assets/truck.wav");
const truckOut = new Audio("assets/truckaudio.mp3");
const error = new Audio("assets/error.wav");
const rightAnswers = [
  "3-blue",
  "2-blue",
  "2-orange",
  "3-orange",
  "3-black",
  "1-black",
];
const shoot = () => {
  const bullet = document.createElement("a-sphere");
  let pos = myCamera.getAttribute("position");
  bullet.setAttribute("position", pos);
  bullet.setAttribute("velocity", getDirection(myCamera, 50));
  bullet.setAttribute("dynamic-body", true);
  bullet.setAttribute("radius", 0.00001);
  bullet.setAttribute("src", "");
  bullet.setAttribute("transparent", true);
  myScene.appendChild(bullet);
  bullet.addEventListener("collide", shootCollided);
};

const shootCollided = (event) => {
  if (event.detail.body.el.id === "floor") {
    console.log("Hit the floor");
    event.detail.target.el.removeEventListener("collide", shootCollided);
    myScene.removeChild(event.detail.target.el);
  } else if (event.detail.body.el.className === "target") {
    console.log("Hit the target!");
    // event.detail.target.el.removeEventListener("collide", shootCollided);
    if (rightAnswers.includes(event.detail.body.el.id)) {
      truckOut.play();
      const box = document.createElement("a-entity");
      box.setAttribute("position", "3.201 4.763 -50.692");
      box.setAttribute("material", "src:#box2");
      box.setAttribute("geometry", "depth:3;height:3;width:3");
      box.setAttribute("static-body", "sphereRadius:NaN");
      box.setAttribute("velocity", "0 0 4");
      myScene.appendChild(box);
    }

    // myScene.removeChild(event.detail.target.el);
    // myScene.removeChild(event.detail.body.el);
    // console.log(rightAnswers.includes(event.detail.target.el.id));
  }
  //   if (document.querySelectorAll(".target").length === 0) {
  //     console.log("You win!");
  //     won();
  //   }
};

const moveBox = () => {
  const AmongDead1 = document.getElementById("amongDead1");
  const Among1 = document.getElementById("among1");

  AmongDead1.setAttribute("visible", true);

  Among1.setAttribute("visible", false);

  AmongDead1.setAttribute("position", "-2.808 0.110 -5.074");

  AmongDead1.setAttribute("rotation", "0 40.000 0");

  wonAudio.play();
};

document.onkeydown = (event) => {
  if (event.which == 32) {
    shoot();
  }
};
