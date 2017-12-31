import { Sequelize } from 'sequelize-typescript';

import { File, Course, University, User, Provider } from "./models/";

const sequelize = new Sequelize(process.env.DATABASE_URL || "");
sequelize.addModels([File, Course, University, User, Provider]);
export default sequelize;