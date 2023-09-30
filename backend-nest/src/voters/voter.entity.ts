import { PaslonSchema } from "src/paslons/paslon.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class VoterSchema {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @ManyToOne(() => PaslonSchema)
  @JoinColumn({ name: 'paslon_id' })
  paslon: PaslonSchema; 
}

