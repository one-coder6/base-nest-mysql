import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string; // 姓名

  @Column()
  public sex: number; // 性别

  @Column()
  public age: number; // 年龄

  @Column()
  public remark: string; // 备注

  @Column()
  public createTime: string; // 创建时间
}
