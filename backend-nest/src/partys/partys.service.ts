import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PartySchema } from './party.entity';
import { Repository } from 'typeorm';
import { CreatePartyDto } from './dtos/create-party.dto';
import { UpdatePartyDto } from './dtos/update-party.dto';

@Injectable()
export class PartysService {
  constructor(@InjectRepository(PartySchema) private partyRepository: Repository<PartySchema>) {}
  find() {
    return this.partyRepository.find();
  }

  async findOneBy(id: string) {
    const numId = Number(id)
    if (isNaN(numId)) throw new BadRequestException('ID must be a number');

    const party = await this.partyRepository.findOne({
      where: {
        id: numId
      }
    })
    if (!party) throw new NotFoundException('Party not found')
    return party
  }

  create(body: CreatePartyDto) {
    return this.partyRepository.save(body)
  }

  async update(id: string, body: UpdatePartyDto) {
    const party = await this.findOneBy(id)
    Object.assign(party, body)
    return this.partyRepository.save(party)
  }

  async delete(id: string) {
    const party = await this.findOneBy(id)
    return this.partyRepository.remove(party)
  }
}
