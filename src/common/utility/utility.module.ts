import { RegexpUtility } from "./regexp.utility";
import { Module } from '@nestjs/common';

  @Module({
    providers: [
        RegexpUtility
    ],
    exports: [
        RegexpUtility
    ],
  })
  export class UtilityModule {
  }
  