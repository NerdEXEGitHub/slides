const express = require("express");
const app = express();
const fs = require("fs");

const getPresentations = () => {
  const _ = {};
  fs.readdirSync("./presentations").forEach((presentation) => {
    _[presentation] = (() => {
      const __ = [];

      fs.readdirSync(`./presentations/${presentation}`).forEach((slide) => {
        __[parseInt(slide)] = fs
          .readFileSync(`./presentations/${presentation}/${slide}`)
          .toString();
      });

      return __;
    })();
  });
  return _;
};

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  const presentations = getPresentations();
  res.render("presentations", { presentations });
});

app.get("/:presentation", (req, res) => {
  res.render("presentation", { presentation: req.params.presentation });
});

app.get("/:presentation/:slide", (req, res) => {
  const presentations = getPresentations();
  res.send(presentations[req.params.presentation][req.params.slide]);
});

app.listen(39771, () => {
  console.log("Listening on http://localhost:39771");
  const presentations = getPresentations();
  Object.keys(presentations).forEach((presentation) => {
    console.log(`${presentation}: http://localhost:39771/${presentation}`);
  });
});
