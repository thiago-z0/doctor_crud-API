'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('doctor_specialties', {
      id : {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      specialtie_id : {
        type: Sequelize.INTEGER,
        references: { model: 'specialties', key: 'id' },
        onUpdte: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      doctor_id : {
        type: Sequelize.INTEGER,
        references: { model: 'doctors', key: 'id' },
        onUpdte: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: true,
      },
      created_at : {
        type: Sequelize.DATE,
        allowNull : false,
      },
      updated_at : {
        type: Sequelize.DATE,
        allowNull : false,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};

