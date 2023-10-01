import { PaslonSchema } from "src/paslons/paslon.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('voters')
export class VoterSchema {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @ManyToOne(() => PaslonSchema, paslon => paslon.voters)
  paslon: PaslonSchema; 
}

