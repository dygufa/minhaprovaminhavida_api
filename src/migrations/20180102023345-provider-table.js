'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("providers", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            type: Sequelize.STRING,
            externalId: Sequelize.STRING,
            externalToken: Sequelize.STRING,
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
        return queryInterface.dropTable("providers");
    }
};
