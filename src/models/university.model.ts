import { Table, Column, Model, HasMany, ForeignKey, BelongsTo, AllowNull, NotNull, Length, IsIn } from 'sequelize-typescript';
import { User, Course } from "./";

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

    @HasMany(() => Course)
    courses: Course[];
}
