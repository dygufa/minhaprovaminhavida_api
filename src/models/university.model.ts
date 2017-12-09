import { Table, Column, Model, ForeignKey, BelongsTo, NotNull, Length, IsIn } from 'sequelize-typescript';
import { User } from "./";

@Table({
    timestamps: true,
})
export default class University extends Model<University> {
    @NotNull
    @Length({ min: 3, max: 15, msg: 'O nome do arquivo deve ter entre 5 e 30 caracteres.' })
    @Column
    name: string;

    @Column
    acronym: string;

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
