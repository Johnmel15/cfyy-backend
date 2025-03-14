import { Table, Column, Model, DataType, ForeignKey } from "sequelize-typescript";
import { User } from "./User";

@Table({ timestamps: true })
export class Appointment extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  id!: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId!: number;

  @Column({ allowNull: false, type: DataType.DATE })
  date!: Date;

  @Column({ allowNull: false, type: DataType.STRING })
  status!: string;
}
