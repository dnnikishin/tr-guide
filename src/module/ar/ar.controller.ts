import { Body, Controller, Get, HttpStatus, Inject, Param, Post, Put, UseGuards, Delete } from '@nestjs/common';
import { ApiResponse, ApiUseTags, ApiImplicitQuery, ApiBearerAuth } from '@nestjs/swagger';
import { ArTags } from './ar.tags';
import { AREntity } from './entities/ar.entity';
import { ArDTO } from './dto/ar.dto';
import { IArService } from './interface/iar.service';
import { AuthGuard } from '@nestjs/passport';
import { CategoryTags } from '../category/category.tags';
import { ArOutputDTO } from './dto/ar.output.dto';


@Controller(ArTags.CONTROLLER_ROUTE)
@ApiUseTags(ArTags.CONTROLLER_ROUTE)
export class ArController {

    constructor(@Inject(ArTags.AR_SERVICE) readonly service: IArService<AREntity, ArDTO>) {
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiResponse({ status: HttpStatus.CREATED, type: ArOutputDTO })
    create(@Body() data: ArDTO): Promise<ArOutputDTO> {      
        return this.service.createAr(data);
    }

    @Get(':id')
    @ApiResponse({ status: HttpStatus.OK, type: ArOutputDTO })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: `${ArTags.ENTITY} does not exist` })
    findOne(@Param('id')id: number): Promise<ArOutputDTO> {
        return this.service.getAr(id);
    }

    @Delete(':id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiResponse({ status: HttpStatus.OK, description: `${CategoryTags.ENTITY} deleted successfully.` })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' })
    remove(@Param('id') id: number): Promise<void> {
        return this.service.remove(id);
    }

    @Put(':id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiResponse({ status: HttpStatus.OK, type: ArOutputDTO })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' })
    update(@Param('id') id: number, @Body() data: ArDTO): Promise<ArOutputDTO> {
        return this.service.updateAr(id, data);
    }


    @Get()
    @ApiResponse({ status: HttpStatus.OK, type: [ArOutputDTO] })
    findAll(): Promise<ArOutputDTO[]> {
        return this.service.getArs();
    }
}