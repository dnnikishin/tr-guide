import { ApiModelProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsArray, IsEmail, IsJSON, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class PlaceDTO {
  @IsString()
  @Expose() @ApiModelProperty({ required: true })
  private readonly name: string;

  @IsOptional() @IsNumber() @Min(-90) @Max(90)
  @Expose() @ApiModelProperty({ description: 'latitude' })
  private readonly lat: number;

  @IsOptional() @IsNumber() @Min(-180) @Max(180)
  @Expose() @ApiModelProperty({ description: 'longitude' })
  private readonly lng: number;

  @IsOptional() @IsNumber()
  @Expose() @ApiModelProperty({ default: 0 })
  private readonly altitude: number;

  @IsOptional() @IsString()
  @Expose() @ApiModelProperty()
  private readonly description: string;

  @IsOptional() @IsString()
  @Expose() @ApiModelProperty()
  private readonly address: string;

  @IsOptional() @IsJSON()
  @Expose() @ApiModelProperty({ type: 'object' })
  private phones: string;

  @IsOptional() @IsString()
  @Expose() @ApiModelProperty()
  private readonly site: string;

  @IsOptional() @IsJSON()
  @Expose() @ApiModelProperty({ type: 'object' })
  private schedule: string;

  @IsOptional() @IsEmail()
  @Expose() @ApiModelProperty()
  private readonly email: string;

  @IsOptional() @IsString()
  @Expose() @ApiModelProperty()
  private readonly price: string;

  @IsOptional() @IsArray()
  @Expose() @ApiModelProperty({ type: 'number', isArray: true })
  readonly categoriesIds: number[];

  @IsOptional() @IsArray()
  @Expose() @ApiModelProperty({ type: 'number', isArray: true })
  readonly filesIds: number[];

  @IsOptional() @IsArray()
  @Expose() @ApiModelProperty({ type: 'number', isArray: true })
  readonly additionalMaterialsIds: number[];

  @IsNumber()
  @Expose() @ApiModelProperty({ type: 'number', required: true })
  readonly thumbnailId: number;

  @IsNumber()
  @ApiModelProperty({ type: 'number', required: true })
  readonly areaId: number;

  convertToJson() {
    this.schedule = JSON.parse(this.schedule);
    this.phones = JSON.parse(this.phones);
  }

}
