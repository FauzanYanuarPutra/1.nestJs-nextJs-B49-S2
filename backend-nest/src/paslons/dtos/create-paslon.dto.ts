import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

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
  @IsInt({ each: true })
  @IsOptional()
  parties?: number[];
}