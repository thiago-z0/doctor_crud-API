const  {Model}  = require('sequelize');
const Sequelize = require('sequelize');



class Doctor extends Model {
  static init (sequelize) {
    super.init({
      name: Sequelize.STRING,
      crm: Sequelize.STRING,
      phone: Sequelize.STRING,
      state: Sequelize.STRING,
      city: Sequelize.STRING,
    },
    {
      sequelize,
    });
    return this;
  }
  static associate(models) {
    this.belongsToMany(models.Specialtie, {
      through: 'doctor_specialties',
      as: 'Especialidades',
      foreignKey: 'doctor_id',
    });

  }

}

export default Doctor;
