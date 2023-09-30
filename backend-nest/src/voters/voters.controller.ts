import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { VotersService } from './voters.service';
import { CreateVoterDto } from './dtos/create-voter.dto';

@Controller('voters')
export class VotersController {
  constructor(private votersService: VotersService) { }
  
  @Get()
  find() {
    return this.votersService.find();
  }

  @Get('/:id')
  findOneBy(@Param('id') id: string) {
    return this.votersService.findOneById(id);
  }

  @Post()
  create(@Body() body: CreateVoterDto) {
    console.log(body)
    return this.votersService.create(body);
  }
}
