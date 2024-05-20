import { Module, Provider } from '@nestjs/common';
import { UserService } from './user.service';
import { UserTags } from './user.tags';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';

const PROVIDERS: Provider[] = [
  {
    useClass: UserService,
    provide: UserTags.USER_SERVICE,
  },
];

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [UserController],
  providers: [
    ...PROVIDERS,
  ],
  exports: [
    ...PROVIDERS,
  ],
})
export class UserModule {}
