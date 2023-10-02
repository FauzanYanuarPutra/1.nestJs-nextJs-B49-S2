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
    return this.paslonsRepository.find({ relations: ['parties', 'voters'] });
  }

  async create(body: CreatePaslonDto, image: Express.Multer.File) {
    const paslon = this.paslonsRepository.create({ ...body, parties: [] });

    if (image) {
      console.log(image)
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
      let public_id: string

      if (paslon.image && paslon.image.includes('res.cloudinary.com')) {
        public_id = this.takePublicID(paslon.image)
      } else {
        public_id = paslon.image
      }

      // const public_id = this.takePublicID(paslon.image)
      const result = await this.updateImage(public_id, image)
      paslon.image = result.url
    } 

    await this.paslonsRepository.save(paslon);
    return paslon;
  }

  async delete(id: string) {
    const paslon = await this.findOneById(id);
    // paslon.parties = await this.addOrRemoveParties(paslon.id, []);

    if (paslon.image && paslon.image.includes('res.cloudinary.com')) {
      const public_id = this.takePublicID(paslon.image)
      await this.cloudinary.deleteImage(public_id)
    } 

    return await this.paslonsRepository.remove(paslon);
  }

  private async addOrRemoveParties(paslonId: string | number, partyIds: (number | string)[]) {
    const paslon = await this.findOneById(paslonId);
  
    const partiesToAdd = partyIds.filter((partyId) =>
      paslon.parties.every((party) => party.id !== partyId)
    );
  
    const partiesToRemove = paslon.parties.filter(
      (party) => !partyIds.includes(party.id)
    );
  
    const partiesToAddEntities = await Promise.all(
      partiesToAdd.map((partyId) =>
        this.partyRepository.findOne({ where: { id: Number(partyId) } })
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

  async updateImage(publicId: string, file: Express.Multer.File) {
    return await this.cloudinary.updateImage(publicId, file).catch(() => {
      throw new BadRequestException('Error updating image');
    });
  }

  takePublicID(imageUrl: string) {
    const parts = imageUrl.split('/');
    const publicIdWithExtension = parts[parts.length - 1]; 
    const publicId = publicIdWithExtension.split('.')[0]; 
    
    return publicId
  }

}



