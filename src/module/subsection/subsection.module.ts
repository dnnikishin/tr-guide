import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SubSectionService } from './subsection.service';
import { SubSectionTags } from './subsection.tags';
import { SubSectionRepository } from './subsection.repository';
import { SubSectionController } from './subsection.controller';
import { MainSectionRepository } from '../main-section/main-section.repository';

const PROVIDERS: Provider[] = [
    {
        useClass: SubSectionService,
        provide: SubSectionTags.SUBSECTION_SERVICE,
    },
];

@Module({
    imports: [
        TypeOrmModule.forFeature([SubSectionRepository, MainSectionRepository]),
    ],
    controllers: [
        SubSectionController,
    ],
    providers: [
        ...PROVIDERS,
    ],
    exports: [
        ...PROVIDERS,
    ],
})
export class SubSectionModule {}
