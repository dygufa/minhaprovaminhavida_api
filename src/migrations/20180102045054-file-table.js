'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("files", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: Sequelize.STRING,
            file: Sequelize.STRING,
            status: Sequelize.STRING,
            type: Sequelize.STRING,
            userId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "users",
                    key: "id"
                }
            },
            universityId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "universities",
                    key: "id"
                }
            },
            courseId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "courses",
                    key: "id"
                }
            },
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("files");
    }
};
