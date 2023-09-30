import { IsOptional, IsString } from "class-validator";

export class UpdatePartyDto {
  @IsString()
  @IsOptional()
  name: string
}