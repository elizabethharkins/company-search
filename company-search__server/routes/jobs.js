const jobsRouter = require("express").Router();
const fetch = require("node-fetch");

jobsRouter.get("/jobs", async (req, res, next) => {  
  try {
    console.log("you have reached jobs router");
  } catch(err) {
    next(err);
  }
});

module.exports = jobsRouter;
