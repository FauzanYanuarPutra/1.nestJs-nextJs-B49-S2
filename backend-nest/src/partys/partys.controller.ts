import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { PartysService } from './partys.service';
import { CreatePartyDto } from './dtos/create-party.dto';
import { UpdatePartyDto } from './dtos/update-party.dto';

@Controller('parties')
export class PartysController {
  constructor(private partysService: PartysService) { }

  @Get() 
  find() {
    return this.partysService.find();
  }

  @Get('/:id')
  findOneBy(@Param('id') id: string) {
    return this.partysService.findOneBy(id);
  }

  @Post()
  create(@Body() body: CreatePartyDto) {
    return this.partysService.create(body);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() body: UpdatePartyDto) {
    return this.partysService.update(id, body);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.partysService.delete(id);
  }
  

}
