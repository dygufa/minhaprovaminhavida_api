import { Table, Column, Model, ForeignKey, BelongsTo, AllowNull, NotNull, Length, IsIn } from 'sequelize-typescript';
import { User } from "./";

@Table({
    timestamps: true,
    tableName: "universities"
})
export default class University extends Model<University> {
    @AllowNull(false)
    @Length({ min: 3, max: 100, msg: 'O nome da universidade deve ter entre 5 e 100 caracteres.' })
    @Column
    name: string;

    @AllowNull(false)
    @Column
    acronym: string;

    @AllowNull(false)
    @IsIn({ msg: "Status inválido", args: [["pending", "approved"]] })
    @Column
    status: string;

    // User
    @ForeignKey(() => User)
    @Column
    userId: number;

    @BelongsTo(() => User)
    user: User;
}
