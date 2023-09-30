import { Module } from '@nestjs/common';
import { PartysController } from './partys.controller';
import { PartysService } from './partys.service';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [PartysController],
  providers: [PartysService]
})
export class PartysModule {}

