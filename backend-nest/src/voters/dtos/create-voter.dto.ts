// import { Optional } from "@nestjs/common";
import { IsNumber, IsOptional, IsString } from "class-validator";
// import { PaslonSchema } from "src/paslons/paslon.entity";

export class CreateVoterDto {
  @IsString()
  name: string

  // @Optional()
  // paslon: PaslonSchema

  @IsNumber()
  @IsOptional()
  paslon_id: number
}

