import { Type } from "class-transformer";
import { IsInt, IsOptional, Max, Min } from "class-validator";

export class PaginateDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  pageIndex: number = 1;

  @IsOptional()
  @Min(1)
  @Max(50)
  @Type(() => Number)
  pageSize: number = 10;
}
