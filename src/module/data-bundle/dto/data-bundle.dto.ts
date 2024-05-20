import { PlaceEntity } from '../../place/entity/place.entity';
import { RouteEntity } from '../../route/entity/route.entity';
import { FileEntity } from '../../file/entity/file.entity';
import { CategoryEntity } from '../../category/entity/category.entity';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { ArDataOutputDTO } from '../../ar/dto/ar.data.output.dto';


export class DataBundleDTO {

    @ApiModelProperty()
    readonly lastUpdate: number;

    @IsArray()
    @ApiModelProperty({ type: [PlaceEntity] })
    readonly places: PlaceEntity[];

    @IsArray()
    @ApiModelProperty({ type: [RouteEntity] })
    readonly routes: RouteEntity[];

    @IsArray()
    @ApiModelProperty({ type: [CategoryEntity] })
    readonly categories: CategoryEntity[];

    @IsArray()
    @ApiModelProperty({ type: [FileEntity] })
    readonly files: FileEntity[];

    @IsArray()
    @ApiModelProperty({ type: [ArDataOutputDTO] })
    readonly irs: ArDataOutputDTO[];
}
