import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaslonSchema } from './paslon.entity';
import { CreatePaslonDto } from './dtos/create-paslon.dto';
import { UpdatePaslonDto } from './dtos/update-paslon.dto';
import { PartySchema } from 'src/partys/party.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class PaslonsService {
  constructor(
    @InjectRepository(PaslonSchema) private paslonsRepository: Repository<PaslonSchema>,
    @InjectRepository(PartySchema) private partyRepository: Repository<PartySchema>,
    private cloudinary: CloudinaryService
  ) { }

  public async findOneById(id: string | number) {
    const numId = Number(id);
    if (isNaN(numId)) {
      throw new BadRequestException('ID must be a number');
    }

    const paslon = await this.paslonsRepository.findOne({
      where: { id: numId },
      relations: ['parties'],
    });

    if (!paslon) {
      throw new NotFoundException('Paslon not found');
    }

    return paslon;
  }

  async findOne(id: number) {
    const paslon = await this.paslonsRepository.findOne({
      where: { id },
    })

    if (!paslon) throw new NotFoundException('Paslon not found')
    return paslon
  }

  async find() {
    return this.paslonsRepository.find({relations: ['parties'],});
  }

  async create(body: CreatePaslonDto, image: Express.Multer.File) {
    const paslon = this.paslonsRepository.create({ ...body, parties: [] });

    if (image) {
      const result = await this.uploadImageToCloudinary(image)
      paslon.image = result.url
    } 
  
    const savedPaslon = await this.paslonsRepository.save(paslon);
    if(body.parties) {
      savedPaslon.parties = await this.addOrRemoveParties(savedPaslon.id, body.parties);
    }
    
    await this.paslonsRepository.save(savedPaslon);
    return savedPaslon;
  }

  async update(id: string, body: UpdatePaslonDto, image: Express.Multer.File) {
    const paslon = await this.findOneById(id);

    Object.assign(paslon, { ...body });
    if(body.parties) {
      paslon.parties = await this.addOrRemoveParties(paslon.id, body.parties);
    }
    if (image) {
      const result = await this.uploadImageToCloudinary(image)
      paslon.image = result.url
    } 
    await this.paslonsRepository.save(paslon);
    return paslon;
  }

  async delete(id: string) {
    const paslon = await this.findOneById(id);
    paslon.parties = await this.addOrRemoveParties(paslon.id, []);
    return await this.paslonsRepository.remove(paslon);
  }

  private async addOrRemoveParties(paslonId: string | number, partyIds: number[]) {
    const paslon = await this.findOneById(paslonId);
  
    const partiesToAdd = partyIds.filter((partyId) =>
      paslon.parties.every((party) => party.id !== partyId)
    );
  
    const partiesToRemove = paslon.parties.filter(
      (party) => !partyIds.includes(party.id)
    );
  
    const partiesToAddEntities = await Promise.all(
      partiesToAdd.map((partyId) =>
        this.partyRepository.findOne({ where: { id: partyId } })
      )
    );
  
    paslon.parties = [...paslon.parties, ...partiesToAddEntities].filter(
      (party) => !partiesToRemove.includes(party)
    );

    return paslon.parties; 
  }

  async uploadImageToCloudinary(file: Express.Multer.File) {
    return await this.cloudinary.uploadImage(file).catch(() => {
      throw new BadRequestException('Error uploading image');
    });
  }

}