import { LinkTags } from "./link.tags";
import { LinkController } from "./link.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LinkRepository } from "./link.repository";
import { Provider, Module } from "@nestjs/common";
import { LinkService } from "./link.service";

const providers: Provider[] = [
    {
      useClass: LinkService,
      provide: LinkTags.LINK_SERVICE,
    },
  ];
  
  @Module({
    imports: [TypeOrmModule.forFeature([LinkRepository])],
    providers: [
      LinkService,
    ],
    controllers: [LinkController],
    exports: [
      ...providers,
    ],
  })
  export class LinkModule {
  }