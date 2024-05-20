import { Module, Provider } from '@nestjs/common';
import { AreaController } from './area.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreaRepository } from './area.repository';
import { AreaTags } from './area.tags';
import { AreaService } from './area.service';

const providers: Provider[] = [
  {
    useClass: AreaService,
    provide: AreaTags.AREA_SERVICE,
  },
];

@Module({
  imports: [
    TypeOrmModule.forFeature([AreaRepository]),
  ],
  controllers: [AreaController],
  providers: [
    ...providers,
  ],
  exports: [
    ...providers,
  ],
})
export class AreaModule {}
