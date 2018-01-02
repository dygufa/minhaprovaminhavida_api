import { Table, Column, Model, ForeignKey, BelongsTo, Is, AllowNull, NotNull, Length, IsIn } from 'sequelize-typescript';
import { User, University } from "./";

@Table({
    timestamps: true,
    tableName: "courses"
})
export default class Course extends Model<Course> {
    @AllowNull(false)
    @Length({ min: 3, max: 50, msg: 'O nome do arquivo deve ter entre 5 e 50 caracteres.' })
    @Column
    name: string;

    @AllowNull(false)
    @Column
    code: string;

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

    // University
    @AllowNull(false)
    @Is(async function checkUniversity(value) {
        const university = await University.findById(value);
        if (!university) {
            throw new Error("Universidade inválida");
        }
    })
    @ForeignKey(() => University)
    @Column
    universityId: number;

    @BelongsTo(() => University)
    university: University;
}
