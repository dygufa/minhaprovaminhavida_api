import { Table, Column, Model, ForeignKey, BelongsTo, Length, NotNull, DataType, IsIn } from 'sequelize-typescript';
import { User, Course, University } from "./";

@Table({
    timestamps: true,
    tableName: "files"
})
export default class File extends Model<File> {
    @NotNull
    @Length({ min: 3, max: 15, msg: 'O nome do arquivo deve ter entre 5 e 30 caracteres.' })
    @Column
    name: string;
    
    @NotNull
    @Column
    file: string;
    
    @NotNull
    @Column(DataType.VIRTUAL)
    file_raw: any;

    @IsIn({ msg: "Status inválido", args: [["pending", "approved"]] })
    @Column
    status: string;

    @IsIn({msg: "Tipo inválido", args: [["exam", "test"]]})
    @Column
    type: string;

    // User
    @ForeignKey(() => User)
    @Column
    userId: number;

    @BelongsTo(() => User)
    user: User;

    // Course
    @ForeignKey(() => Course)
    @Column
    courseId: number;

    @BelongsTo(() => Course)
    course: Course;

    // University
    @ForeignKey(() => University)
    @Column
    universityId: number;

    @BelongsTo(() => University)
    university: University;
}



