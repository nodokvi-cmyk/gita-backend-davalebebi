import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Director } from "../../directors/entities/director.entity";

@Entity("films")
export class Film {

    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column()
    title!: string

    @Column()
    genre!: string

    @Column()
    year!: number

    @ManyToOne(() => Director, (director) => director.films, {onDelete: "CASCADE"})
    director!: Director
}
