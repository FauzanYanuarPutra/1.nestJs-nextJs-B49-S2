import { Module } from '@nestjs/common';
import { PartysController } from './partys.controller';
import { PartysService } from './partys.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartySchema } from './party.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PartySchema])],
  controllers: [PartysController],
  providers: [PartysService]
})
export class PartysModule {}

