import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaslonsModule } from './paslons/paslons.module';
import { PartysModule } from './partys/partys.module';
import { PaslonSchema } from './paslons/paslon.entity';
import { PartySchema } from './partys/party.entity';
import { VotersModule } from './voters/voters.module';
import { VoterSchema } from './voters/voter.entity';
import { CloudinaryModule } from './cloudinary/cloudinary.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'paslon_fullstack',
      entities: [PaslonSchema, PartySchema, VoterSchema],
      // autoLoadEntities: true,
      synchronize: true
    }),
    PaslonsModule,
    PartysModule,
    VotersModule,
    CloudinaryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


