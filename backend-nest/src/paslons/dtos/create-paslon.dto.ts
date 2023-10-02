import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePaslonDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  // @IsOptional()
  // @IsString()
  // image: string;

  @IsString()
  @IsNotEmpty()
  visi: string;

  @IsArray()
  @IsOptional()
  parties?: (string | number)[];
}