const express = require("express");
const exphbs = require("express-handlebars");
const fs = require("fs");
const path = require("path");
const lineByLine = require("n-readlines");
const app = express();

// https://www.npmjs.com/package/express-handlebars
app.engine(".hbs", exphbs({ extname: '.hbs' }));
app.set("view engine", ".hbs");

app.use(express.static(path.join(__dirname, 'dist')))

const regexPage = /^{{!\s*page\s*\:\s*([A-Za-z0-9\s]*)*}}$/;
const regexMode = /^{{!\s*mode\s*\:\s*([A-Za-z0-9\s]*)%{3}\s*([A-Za-z0-9]*)\s*}}$/;

var matches = [];
var pages = [];

fs.readdirSync("./views").forEach(file => {
  if (path.extname(file) === ".hbs" && file.charAt(0) !== "_") {
    const liner = new lineByLine(`./views/${file}`);
    let line;
    let name = "";
    let modes = [];

    while (line = liner.next()) {
      if (matches = line.toString('utf8').match(regexPage)) {
        name = matches[1];
      } else if (matches = line.toString('utf8').match(regexMode)) {
        modes.push({
          code: matches[2],
          label: matches[1]
        });
      } else {
        break;
      }
    }

    if (name) {
      let template = file.replace(".hbs", "");
      pages.push({
        template: template,
        url: template === "home" ? "/" : "/" + template,
        label: name,
        modes: modes
      });
    }
  }
});

pages.forEach(function (value) {
  app.get(value.url, function (req, res) {

    var params = {
      prototiipPages: pages.map(function (val) {
        val.selected = value.url == val.url;
        return val;
      })
    };

    for (let queryArg in req.query) {
      params[queryArg] = true;
    }

    params.prototiipModes = [];

    if (value.modes.length) {
      params.prototiipModes.unshift({
        code: "",
        label: "Default"
      });

      value.modes.forEach(function (val) {
        params.prototiipModes.push(val);
      })

      params.prototiipModes = params.prototiipModes.map(function (val) {
        val.selected = params.hasOwnProperty(val.code) || (val.code === "" && Object.keys(req.query).length === 0);
        val.url = val.code === "" ? "" : "?" + val.code;
        return val;
      });
    }

    res.render(value.template, params);
  });
});

app.listen(8080);