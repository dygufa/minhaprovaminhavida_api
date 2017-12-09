import { Sequelize } from 'sequelize-typescript';

import { File, Course, University, User } from "./models/";

const sequelize = new Sequelize(process.env.DATABASE_URL || "");
sequelize.addModels([File, Course, University, User]);
export default sequelize;