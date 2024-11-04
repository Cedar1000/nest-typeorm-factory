import { PrimaryGeneratedColumn, Entity, Column } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  body: string;

  @Column({ default: 0 })
  retweets: number;

  @Column()
  category: string;

  @Column({ default: new Date() })
  createdAt: Date;
}
