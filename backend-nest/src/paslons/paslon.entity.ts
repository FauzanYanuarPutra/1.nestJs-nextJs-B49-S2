import { PartySchema } from "src/partys/party.entity";
import { VoterSchema } from "src/voters/voter.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

  @ManyToMany(() => PartySchema, party => party.users) 
  @JoinTable({ name: 'paslons_parties' })
  parties: PartySchema[];

  @OneToMany(() => VoterSchema, voter => voter.paslon)
  voters: VoterSchema[]
}


