import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Orders {
@PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: string;

  @Column()
  product: string;

  @Column({ nullable: true })
  quantity: string;
}