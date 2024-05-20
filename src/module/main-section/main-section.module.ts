import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MainSectionService } from './main-section.service';
import { MainSectionController } from './main-section.controller';
import { MainSectionTags } from './main-section.tags';
import { MainSectionRepository } from './main-section.repository';

const PROVIDERS: Provider[] = [
    {
        useClass: MainSectionService,
        provide: MainSectionTags.SECTION_SERVICE,
    },
];

@Module({
    imports: [
        TypeOrmModule.forFeature([MainSectionRepository]),
    ],
    controllers: [
        MainSectionController,
    ],
    providers: [
        ...PROVIDERS,
    ],
    exports: [
        ...PROVIDERS,
    ],
})
export class MainSectionModule {}
