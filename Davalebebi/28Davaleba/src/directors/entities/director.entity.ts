import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Film } from "../../films/entities/film.entity";

@Entity("directors")
export class Director {

    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column()
    name!: string

    @Column()
    age!: number

    @OneToMany(() => Film, (film) => film.director, {cascade: true})
    films!: Film[]
}
