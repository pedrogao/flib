import express from "express";
import { join } from "path";
import { mkdirSync, stat, writeFileSync } from "fs";
import cors from "cors";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

let app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
var options = {
  inflate: true,
  limit: "100kb",
  type: "application/octet-stream",
};

app.use(bodyParser.raw(options));

try {
  mkdirSync(join(__dirname, "data"));
} catch (err) {
  if (err.code !== "EEXIST") {
    console.error(err);
  }
}

app.use(cors());

app.get("/:id", (req, res) => {
  let id = req.params.id;
  let filename = join(__dirname, "data", id);
  stat(filename, (err, stats) => {
    if (err) {
      console.error(err);
      res.status(404).send("Not found");
    } else {
      res.sendFile(filename);
      console.log("sending");
    }
  });
});

app.post("/:id", (req, res) => {
  let id = req.params.id;
  writeFileSync(join(__dirname, "data", id), req.body);
  res.status(200).send("ok");
});

const port = 5000;

app.listen(port, () => {
  console.log("listening on http://localhost:" + port);
});
