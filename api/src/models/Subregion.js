const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define('subregion', {
		name: {
			
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,

			get() {
				const rawName = this.getDataValue('name');
				return rawName !== '' ? rawName : 'Unknown';
			}
		}
	})
};