// import { CategoryController } from '../category.controller';
// import { CategoryService } from '../category.service';
// import { Test } from '@nestjs/testing';
// import { CategoryEntity } from '../entity/category.entity';
// import { plainToClass } from 'class-transformer';
// import { CategoryModule } from '../category.module';
// import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
//
// describe('CategoryController', () => {
//   let categoryController: CategoryController;
//   let categoryService: CategoryService;
//
//   const category = [plainToClass(CategoryEntity, { name: 'kek' })];
//
//   beforeAll(async () => {
//     const module = await Test.createTestingModule({
//       imports: [CategoryModule,
//       ],
//     }).compile();
//
//     categoryService = module.get<CategoryService>(CategoryService);
//     categoryController = module.get<CategoryController>(CategoryController);
//   });
//
//   describe('findAll', () => {
//     it('should return an array of categories', async () => {
//       // const result = category;
//       // jest.spyOn(categoryService, 'findAll').mockImplementation(() => Promise.resolve(category));
//
//       expect(await categoryService.findAll()).to([]);
//     });
//   });
//
//
//   afterAll(async () => {
//     await userService.destroy(user.id);
//     app.close();
// });
