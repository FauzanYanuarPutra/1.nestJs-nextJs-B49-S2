import { IsArray, IsInt, IsOptional, IsString } from "class-validator";

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
  @IsInt({ each: true })
  @IsOptional()
  parties?: number[];
}