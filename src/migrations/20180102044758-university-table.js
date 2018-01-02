'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("universities", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: Sequelize.STRING,
            acronym: Sequelize.STRING,
            status: Sequelize.STRING,
            userId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "users",
                    key: "id"
                }
            },
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE
        });
    },
    
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("universities");
    }
};
