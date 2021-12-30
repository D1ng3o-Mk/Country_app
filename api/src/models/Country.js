const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {

  sequelize.define('country', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },


    flag: {
      type: DataTypes.STRING,
      defaultValue: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Nuvola_unknown_flag.svg/1024px-Nuvola_unknown_flag.svg.png',
    },
    capital: {
      type: DataTypes.STRING,
      defaultValue: 'Unknown',
    },    
    
    population: {
      type: DataTypes.INTEGER,
    },   

    area: {
      type: DataTypes.INTEGER,
    },       

  }, {
    timestamps: false,
})

};