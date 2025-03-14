import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({ timestamps: true })
export class Career extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  id!: number;

  @Column({ allowNull: false, type: DataType.STRING })
  title!: string;

  @Column({ allowNull: false, type: DataType.TEXT })
  description!: string;
}
