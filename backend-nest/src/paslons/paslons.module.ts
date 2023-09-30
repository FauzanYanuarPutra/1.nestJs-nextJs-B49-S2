import { Module } from '@nestjs/common';
import { PaslonsController } from './paslons.controller';
import { PaslonsService } from './paslons.service';
import { SharedModule } from 'src/shared/shared.module';
import { VotersService } from 'src/voters/voters.service';

@Module({
  imports: [SharedModule],
  controllers: [PaslonsController],
  providers: [PaslonsService, VotersService],
})
export class PaslonsModule {}



