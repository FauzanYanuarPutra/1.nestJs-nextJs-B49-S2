import { Module } from '@nestjs/common';
import { VotersController } from './voters.controller';
import { VotersService } from './voters.service';
import { SharedModule } from 'src/shared/shared.module';
import { PaslonsService } from 'src/paslons/paslons.service';

@Module({
  imports: [SharedModule],
  controllers: [VotersController],
  providers: [VotersService, PaslonsService]
})
export class VotersModule {}
