import { IsArray, IsOptional, IsString } from "class-validator";

export class UpdatePaslonDto {
  @IsString()
  @IsOptional()
  name: string;

  // @IsOptional()
  // @IsString()
  // image: string;

  @IsString()
  @IsOptional()
  visi: string;

  @IsArray()
  @IsOptional()
  parties?: (string | number)[];
}