const server = require('./src/app');  
const { conn } = require('./src/db'); 
const axios = require('axios');
const { Country , Region , Subregion } = require('./src/db'); 
const respaldo = require("./respaldo/all_countries.json") // respaldo
const pre_loader = async () => {

  try {
    
    let resp={};
    
    const {data} = await axios.get('https://restcountries.com/v3/all');

    if(data.length==0){
      resp.data = respaldo;
      //console.log(resp.data);
      console.log("Usando respaldo");
    }

    else{
      resp.data = data;
      //console.log(resp.data);
      console.log("Api funcionando");
    }
    
    for (let country of resp.data) {

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
}

//reiniciar la app cada vez que se inicia = true y mantener los datos guardados = false
conn.sync({ force: true})

.then(() => {
  pre_loader();
  server.listen(3001, () => {
    console.log('%s listening at 3001');
  });
});
