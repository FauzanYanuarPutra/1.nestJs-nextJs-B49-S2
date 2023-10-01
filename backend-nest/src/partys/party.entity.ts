import { PaslonSchema } from 'src/paslons/paslon.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany} from 'typeorm';

@Entity('parties')
export class PartySchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => PaslonSchema, paslon => paslon.parties)
  users: PaslonSchema[]
}




