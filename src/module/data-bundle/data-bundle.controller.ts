import { Controller, Get, Inject, ClassSerializerInterceptor, UseInterceptors, HttpStatus, Query } from '@nestjs/common';
import { DataBundleTags } from './data-bundle.tags';
import { ApiUseTags, ApiResponse, ApiImplicitQuery } from '@nestjs/swagger';
import { DataBundleDTO } from './dto/data-bundle.dto';
import { IDataBundleService } from './interfaces/idata-bundle.service';
import { ISyncService } from './interfaces/isync.service';

@Controller(DataBundleTags.CONTROLLER_ROUTE)
@ApiUseTags(DataBundleTags.CONTROLLER_ROUTE)
@UseInterceptors(ClassSerializerInterceptor)
export class DataBundleController {
    constructor(
        @Inject(DataBundleTags.DATA_BUNDLE_SERVICE) private readonly dataBundleService: IDataBundleService,
        @Inject(DataBundleTags.SYNC_SERVICE) private readonly syncService: ISyncService,
    ) { }

    @Get()
    @ApiResponse({ status: HttpStatus.OK, type: DataBundleDTO })
    @ApiImplicitQuery({ name: 'lastUpdate', required: false, type: 'number' })
    @ApiImplicitQuery({ name: 'version', type: 'string', required: false })
    async getAll(@Query('lastUpdate') lastUpdate?: number, @Query('version') version?: string): Promise<DataBundleDTO> {
        return this.dataBundleService.getBundle(lastUpdate, version);
    }

    // @Get('/test')
    // @ApiImplicitQuery({ name: 'lastUpdate', required: false, type: 'number' })
    // async getTime(@Query('lastUpdate') lastUpdate?: number): Promise<{ GettingTime: Date, CurrentTime: number }> {
    //     const GettingTime: Date = this.syncService.convertLastUpdate(lastUpdate);
    //     const CurrentTime: number = this.syncService.createLastUpdate();
    //     return {GettingTime, CurrentTime};
    // }
}
