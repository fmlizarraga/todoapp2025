import { 
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    Generated
} from 'typeorm';
import { User } from './User';

@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    @Generated('uuid')
    uuid!: string;

    @Column()
    label!: string;

    @Column({ default: false })
    checked!: boolean;

    @CreateDateColumn({ type: 'timestamp with time zone' })
    timestamp!: Date;

    @ManyToOne(() => User, user => user.todos, { onDelete: 'CASCADE' })
    user!: User;
}
