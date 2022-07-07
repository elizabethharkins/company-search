const jobsRouter = require("express").Router();
const fetch = require("node-fetch");

jobsRouter.get("/jobs/:id", async (req, res, next) => {  
  try {
    const { id } = req.params;

    const jobsByCompany = 
      await fetch(`https://www.inhersight.com/api/v1/ihs-candidates/jobs?company_id=${id}&page=1`)
        .then(res => res.json());
          
    const transformRawData = (data) => data
      .map(data => { return { 
        id: data.id, 
        title: data.title, 
        locations: data.locations,
        remote: data.remote 
      } 
    });
          
    const transformedJobsData = transformRawData(jobsByCompany.results);
    res.send(transformedJobsData);
    } catch(err) {
      next(err);
    }
});

module.exports = jobsRouter;
