const express = require("express");
const cors = require("cors");
const app = express();
const companiesRouter = require("./routes/companies.js");
const port = process.env.port || 8080;

app.use(cors());
app.use(express.json());
app.use(companiesRouter);

app.get("/", (req, res, next) => {
  res.send("Welcome, you've got ... a server.");
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});