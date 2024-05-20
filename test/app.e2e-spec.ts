// import { Test, TestingModule } from '@nestjs/testing';
// import * as request from 'supertest';
// import { AppModule } from '../src/app.module';
// import { CategoryTags } from '../src/module/category/category.tags';
//
// describe('AppController (e2e)', () => {
//   let app;
//   let catsService = { findAll: () => ['test'] };
//
//   beforeEach(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [AppModule],
//     }).compile();
//
//     app = moduleFixture.createNestApplication();
//     await app.init();
//   });
//
//   it(`/GET category`, () => {
//     return request(app.getHttpServer())
//       .get('/' + CategoryTags.ENTITY)
//       .expect(200)
//       .expect({
//         data: catsService.findAll(),
//       });
//   });
//
//   afterAll(async () => {
//     await app.close();
//   });
// });
