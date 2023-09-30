import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity('parties')
export class PartySchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}




