'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("users", { 
            id: { 
                type: Sequelize.INTEGER, 
                primaryKey: true, 
                autoIncrement: true 
            },
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            avatar: Sequelize.STRING,
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE
        });
    },
    
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("users");
    }
};
