const  {Model}  = require('sequelize');
const Sequelize = require('sequelize');



class Doctor_specialties extends Model {
  static init (sequelize) {
    super.init({
      specialtie_id: Sequelize.STRING,
      doctor_id: Sequelize.STRING,
    },
    {
      sequelize,
    });
    return this;
  };
  static associate(models) {
    this.hasOne(models.Specialtie, {
      foreignKey: 'id',
    });

  }
  static associate(models) {
    this.hasOne(models.Specialtie, {
      foreignKey: 'id',
    });

  }
}
export default Doctor_specialties;

