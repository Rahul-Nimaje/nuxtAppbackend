'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users','token',{
      type:Sequelize.TEXT
    })
    await queryInterface.addColumn('users', 'image', {
      type: Sequelize.TEXT
    })
  },

  down: async (queryInterface) => {
   await queryInterface.removeColumn('users','token')
   await queryInterface.removeColumn('users','image')
  },
};
