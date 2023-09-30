import { Module } from '@nestjs/common';
import { PaslonsController } from './paslons.controller';
import { PaslonsService } from './paslons.service';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [PaslonsController],
  providers: [PaslonsService]
})
export class PaslonsModule {}



