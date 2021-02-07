import express from "express";

// app
const app = express();

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hi there",
  });
});

app.listen(4010, () => {
  console.log("App listening on port 4010!");
});
