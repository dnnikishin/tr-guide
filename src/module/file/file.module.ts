import { Module, Provider } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileRepository } from './file.repository';
import { FileTags } from './file.tags';

const providers: Provider[] = [
  {
    useClass: FileService,
    provide: FileTags.FILE_SERVICE,
  },
];

@Module({
  imports: [
    TypeOrmModule.forFeature([FileRepository]),
  ],
  controllers: [FileController],
  providers: [
    ...providers,
  ],
  exports: [
    ...providers,
  ],
})
export class FileModule {
}
