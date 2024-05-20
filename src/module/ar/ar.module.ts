import { Module, Provider } from '@nestjs/common';
import { ArTags } from './ar.tags';
import { ArService } from './ar.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArRepository } from './ar.repository';
import { FileModule } from '../file/file.module';
import { ArController } from './ar.controller';
import { AdditionalMaterialModule } from '../additional-material/am.module';
import { LinkModule } from '../link/link.module';

const PROVIDERS: Provider[] = [
    {
      provide: ArTags.AR_SERVICE,
      useClass: ArService,
    },
  ];

@Module({
    imports: [
        TypeOrmModule.forFeature([ArRepository]),
        FileModule,
        AdditionalMaterialModule,
        LinkModule
      ],
      controllers: [ArController],
      providers: [
        ...PROVIDERS,
      ],
      exports: [
        ...PROVIDERS,
      ],
})
export class ARModule {
}
