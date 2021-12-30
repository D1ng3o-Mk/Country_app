const server = require('./src/app');  
const { conn } = require('./src/db'); 
const axios = require('axios');
const { Country , Region , Subregion } = require('./src/db'); 

const pre_loader = async () => {

  try {
    
    const countries = await axios.get('https://restcountries.com/v3/all');

    for (let country of countries.data) {

      let { cca3, name, flags, capital, region, subregion, population,area } = country;
      let [countryRes, created] = await Country.findOrCreate({
       
        where: {
          id: cca3,
        },

        defaults: {

          name: name.official,
          flag: flags ? flags[1] : null,
          capital: capital ? capital[0] : null,
          population,
          area,
          
        }
        
      });

      let [regionRes, rCreated] = await Region.findOrCreate({ 
        where:  { 

          name: region || 'Unknown'
          
        } });

      let [subregionRes, srCreated] = await Subregion.findOrCreate({
         where: {

            name: subregion || 'Unknown'
            
          } });

      if (srCreated) {regionRes.addSubregion(subregionRes);}

      subregionRes.addCountry(countryRes);
    }
  }
  catch (err) {
   console.error(err);
  }  
};



conn.sync({ force: true })
.then(() => {
  pre_loader();
  server.listen(3001, () => {
    console.log('%s listening at 3001');
  });
});
