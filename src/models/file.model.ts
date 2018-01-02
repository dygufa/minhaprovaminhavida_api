import { Table, Column, Model, ForeignKey, BelongsTo, Is, Length, NotNull, AllowNull, DataType, IsIn } from 'sequelize-typescript';
import { User, Course, University } from "./";



@Table({
    timestamps: true,
    tableName: "files"
})
export default class File extends Model<File> {
    @AllowNull(false)
    @Length({ min: 3, max: 30, msg: 'O nome do arquivo deve ter entre 5 e 30 caracteres.' })
    @Column
    name: string;
    
    @Column
    file: string;

    @AllowNull(false)
    @IsIn({ msg: "Status inválido", args: [["pending", "approved"]] })
    @Column
    status: string;

    @AllowNull(false)
    @IsIn({msg: "Tipo inválido", args: [["exam", "test"]]})
    @Column
    type: string;

    // User
    @AllowNull(false)
    @ForeignKey(() => User)
    @Column
    userId: number;

    @BelongsTo(() => User)
    user: User;

    // Course
    @AllowNull(false)
    @Is(async function checkCourse(value) {
        const course = await Course.findById(value);
        if (!course) {
            throw new Error("Disciplina inválida");
        }
    })
    @ForeignKey(() => Course)
    @Column
    courseId: number;

    @BelongsTo(() => Course)
    course: Course;

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



