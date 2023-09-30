import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PaslonsService } from './paslons.service';
import { CreatePaslonDto } from './dtos/create-paslon.dto';
import { UpdatePaslonDto } from './dtos/update-paslon.dto';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('paslons')
export class PaslonsController {
  constructor(private paslonService: PaslonsService) { }
  @Get()
  async find() {
    const data = await this.paslonService.find()
    return data
  }

  @Get('/:id')
  findOneBy(@Param('id') id: string) {
    return this.paslonService.findOneById(id)
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(@Body() body: CreatePaslonDto, @UploadedFile() image: Express.Multer.File) {
    return this.paslonService.create(body, image);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() body: UpdatePaslonDto, @UploadedFile() image: Express.Multer.File) {
    return this.paslonService.update(id, body, image)
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.paslonService.delete(id)
  }  

}

