import { PartySchema } from "src/partys/party.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('paslons')
export class PaslonSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  image: string;

  @Column()
  name: string;

  @Column()
  visi: string;

  @ManyToMany(() => PartySchema, party => party) 
  @JoinTable()
  parties: PartySchema[];
}


