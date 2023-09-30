import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { VoterSchema } from './voter.entity';
import { InjectRepository } from '@nestjs/typeorm';
// import { CreateVoterDto } from './dtos/create-voter.dto';
import { PaslonSchema } from 'src/paslons/paslon.entity';
import { PaslonsService } from 'src/paslons/paslons.service';
import { CreateVoterDto } from './dtos/create-voter.dto';

@Injectable()
export class VotersService {
  constructor(
    @InjectRepository(VoterSchema) private voteRepository: Repository<VoterSchema>,
    @InjectRepository(PaslonSchema) private paslonRepo: Repository<PaslonSchema>,
    private paslonService: PaslonsService
  ) { }

  async countVoter() {
    const queryBuilder = this.voteRepository.createQueryBuilder('voter')
      .leftJoin('voter.paslon', 'paslon') 
      .select(['paslon.*', 'COUNT(*) as total']) 
      .groupBy('paslon.id'); 
  
    return queryBuilder.getRawMany();
  }

  find() {
    return this.voteRepository.find({
      relations: ['paslon'], 
      select: ['paslon'], 
    });
  }

  async findOneById(ids: string) {
    const id = Number(ids)
    if (isNaN(id)) throw new BadRequestException('ID must be a number');

    const voter = await this.voteRepository.findOne({
      where: { id: id },
      relations: ['paslon'],
      select: ['paslon'],
    })

    return voter
  }
  
  async create(body: CreateVoterDto) {
    const { name,  paslon_id } = body

    const voter = this.voteRepository.create({ name })

    const id = paslon_id

    console.log(name, paslon_id)
    const paslonAdd = await this.paslonService.findOneById(id)
    voter.paslon = paslonAdd

    return this.voteRepository.save(voter)
  }

  // async update(id: string, body: CreateVoterDto) {
  //   const { name, paslon_id } = body

  //   const voter = await this.findOneById(id)
  //   voter.name = name
  //   voter.paslon = paslon_id

  //   return voter
  // }

}
