import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { UserDTO } from './dto/user.dto';
import { UserRepository } from './user.repository';
import { IUserService } from './interfaces/iuser.service';
import { NonRelationCrudService } from '../../common/base/non-relation-crud.service';
import { InsertResult } from 'typeorm';

@Injectable()
export class UserService
    extends NonRelationCrudService<UserEntity, UserDTO, UserRepository>
    implements IUserService<UserEntity, UserDTO> {

    constructor(protected readonly repository: UserRepository) {
        super(repository);
    }

    async findByUsername(username: string): Promise<UserEntity | undefined> {
        return this.repository.findByUsername(username);
    }

    async create(data: UserDTO): Promise<UserEntity> {
        const user: UserEntity = this.repository.create(data);
        const insertResult: InsertResult = await this.repository.insert(user);
        const { id } = insertResult.raw[0];
        return this.findOne(id);
    }

    async update(id: number, data: UserDTO): Promise<UserEntity> {
        const user = this.findOne(id);
        const newUserData = { ...user, ...data };
        const newUser: UserEntity = this.repository.create(newUserData);
        await newUser.hashPassword();
        await this.repository.update(id, newUser);
        return this.findOne(id);
    }

}
