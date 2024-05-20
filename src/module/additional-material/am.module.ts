import { Provider, Module } from "@nestjs/common";
import { AdditionalMaterialTags } from "./am.tags";
import { AdditionalMaterialService } from "./am.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdditionalMaterialRepository } from "./am.repository";
import { FileModule } from "../file/file.module";
import { AmController } from "./am.controller";
import { ArRepository } from "../ar/ar.repository";
import { PlaceRepository } from "../place/place.repository";

const PROVIDERS: Provider[] = [
    {
      provide: AdditionalMaterialTags.AM_SERVICE,
      useClass: AdditionalMaterialService,
    },
  ];

@Module({
    imports: [
        TypeOrmModule.forFeature([AdditionalMaterialRepository, ArRepository, PlaceRepository]),
        FileModule,
      ],
      controllers: [AmController],
      providers: [
        ...PROVIDERS,
      ],
      exports: [
        ...PROVIDERS,
      ],
})
export class AdditionalMaterialModule {
}