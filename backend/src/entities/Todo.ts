import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    label!: string;

    @Column({ default: false })
    checked!: boolean;

    @CreateDateColumn({ type: 'datetime' })
    timestamp!: number;

    @ManyToOne(() => User, user => user.todos, { onDelete: 'CASCADE' })
    user!: User;
}
