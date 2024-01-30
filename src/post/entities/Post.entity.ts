import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";

@Entity({name: 'tbl_post'})
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({nullable: true})
    content: string;

    @CreateDateColumn({name: 'created_date'})
    createdDate: Date;

    @UpdateDateColumn({name: 'updated_date'})
    updatedDate: Date;
}