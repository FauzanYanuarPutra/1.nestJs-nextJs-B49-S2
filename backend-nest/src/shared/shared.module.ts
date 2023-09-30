import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { PartySchema } from 'src/partys/party.entity';
import { PaslonSchema } from 'src/paslons/paslon.entity';
import { VoterSchema } from 'src/voters/voter.entity';

@Module({
  imports: [CloudinaryModule, TypeOrmModule.forFeature([VoterSchema, PaslonSchema, PartySchema])],
  exports: [CloudinaryModule, TypeOrmModule.forFeature([VoterSchema, PaslonSchema, PartySchema])],
})
export class SharedModule {}
