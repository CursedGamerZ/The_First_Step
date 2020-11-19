import { Entity, Column, PrimaryColumn, CreateDateColumn } from "typeorm";

@Entity()
export class Account {
  @PrimaryColumn()
  name!: string;

  @Column()
  Hpass!: string;

  @Column()
  email!: string;

  @Column()
  bio!: string;

  @Column()
  birthday!: string;

  @Column()
  Role!: string;

  @CreateDateColumn()
  accountDOB!: string;
}
