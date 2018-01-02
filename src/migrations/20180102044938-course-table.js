'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("courses", {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			name: Sequelize.STRING,
			code: Sequelize.STRING,
			status: Sequelize.STRING,
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
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE
		});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable("courses");
	}
};
