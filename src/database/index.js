const  { Model }  = require('sequelize');
import Sequelize from 'sequelize';



import Doctor from '../app/models/Doctor';
import Specialtie from '../app/models/Specialtie';
import Doctor_specialties from '../app/models/Doctor_specialties';

import databaseConfig from '../config/database';

const models = [Doctor , Specialtie, Doctor_specialties];

class Database{
  constructor (){
    this.init();

  }

  init() {
    // conexão base dados
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
    models.map(model => model.associate && model.associate(this.connection.models));
  }

}

export default new Database();
