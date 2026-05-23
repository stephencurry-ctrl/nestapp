import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  // 主键自增
  @PrimaryGeneratedColumn()
  id!: number;
  // 姓名
  @Column()
  name!: string;
  @Column()
  password!:string;
  @Column()
  email!:string;
  @Column()
  role!:'admin'|'user';
}