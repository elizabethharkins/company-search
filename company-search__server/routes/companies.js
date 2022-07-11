const companiesRouter = require("express").Router();
const fetch = require("node-fetch");

const jobsByCompany = async (id) => {
  const response = await fetch(`https://www.inhersight.com/api/v1/ihs-candidates/jobs?company_id=${id}&page=1`);
  const jobs = await response.json();

  return jobs;
}

companiesRouter.get("/companies", async (req, res, next) => {  
  try {

    const companies = 
      await fetch("https://www.inhersight.com/api/v1/ihs-candidates/companies?page=1");

    const companiesResponse = await companies.json();

    const companiesSnapshot = [...companiesResponse.results];

    await Promise.all(companiesSnapshot.map(async (company) => {
      const jobs = await jobsByCompany(company.id);
      company.jobs = jobs;
    }));

    const transformRawData = (data) => data
      .map(data => { return { 
        id: data.id, 
        name: data.name, 
        url: data.url, 
        score: data.rounded_weighted_composite_score, 
        logo: data.logo_square_url,
        jobs: data.jobs 
      } 
    });
      
    const transformedCompaniesData = transformRawData(companiesSnapshot);
    res.send(transformedCompaniesData);
  } catch(err) {
    next(err);
  }
});

module.exports = companiesRouter;
