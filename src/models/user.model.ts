import { Table, Column, Model } from 'sequelize-typescript';

@Table({
	timestamps: true,
	tableName: "users"
})
export default class User extends Model<User> {
	@Column
	name: string;

	@Column
	email: string;

	@Column
	avatar: string;
}