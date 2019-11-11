const  {Model}  = require('sequelize');
const Sequelize = require('sequelize');



class Specialtie extends Model {
  static init (sequelize) {
    super.init({
      specialtie_name: Sequelize.STRING,
    },
    {
      sequelize,
    });
  }
  static associate(models) {
    this.belongsToMany(models.Doctor, {
      through: 'doctor_specialties',
      as: 'Doctor',
      foreignKey: 'specialtie_id',
    });
  }

}

export default Specialtie;
