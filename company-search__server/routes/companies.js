const companiesRouter = require("express").Router();
const fetch = require("node-fetch");

/* todo, temp */
const generateRandomNumberOfJobsForCompanyData = () => {
  return Math.floor(Math.random() * 200) + 1;
}

companiesRouter.get("/companies", async (req, res, next) => {  
  try {
    const companies = 
      await fetch("https://www.inhersight.com/api/v1/ihs-candidates/companies?page=1")
        .then(res => res.json());
      
    const transformRawData = (data) => data
      .map(data => { return { 
        id: data.id, 
        name: data.name, 
        url: data.url, 
        score: data.rounded_weighted_composite_score, 
        logo: data.logo_square_url,
        jobs: generateRandomNumberOfJobsForCompanyData() 
      } 
    });
      
    const transformedCompaniesData = transformRawData(companies.results);
    res.send(transformedCompaniesData);
  } catch(err) {
    next(err);
  }
});

module.exports = companiesRouter;