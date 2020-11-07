import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn} from "typeorm";

@Entity()
export class Posts {
    @Column()
    catagory! : string;

    @PrimaryGeneratedColumn()
    id!:number;

    @Column()
    author! : string;

    @Column()
    title!: string;
    
    @Column()
    content!: string;

    @CreateDateColumn()
    date! : string
}

export class Accounts {
    @Column()
    name! : string;

    @Column()
    password! :string;
}
