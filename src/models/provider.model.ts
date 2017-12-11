import { Table, Column, Model, ForeignKey, BelongsTo, IsIn} from 'sequelize-typescript';
import { User } from "./";

@Table({
    timestamps: true,
})
export default class Provider extends Model<Provider> {
    @IsIn({ msg: "Tipo inválido", args: [["facebook", "google"]] })
    @Column
    type: "facebook" | "google";

    @Column
    externalId: string;

    @Column
    externalToken: string;

    // User
    @ForeignKey(() => User)
    @Column
    userId: number;

    @BelongsTo(() => User)
    user: User;
}
