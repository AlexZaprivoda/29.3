const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.listen(3000, () => {
  console.log("app run on port 3000");
});

app.use(express.static("./public"));
app.use(bodyParser.urlencoded({}));
app.use(bodyParser.json());

let emails = [];

app.get("/reg", (req, res) => {
  const email = emails.find(e => e === req.query.email);

  if (email) {
    res.status(401);
    res.send(
      JSON.stringify({
        message: `Email: '${req.query.email}' already exist`
      })
    );
  } else {
    emails.push(req.query.email);
    res.send(
      JSON.stringify({
        message: `Email: '${req.query.email}' registered`
      })
    );
  }
});

app.get("/all", (req, res) => {
  res.send(emails);
});
