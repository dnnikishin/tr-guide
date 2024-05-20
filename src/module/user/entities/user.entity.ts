import { BeforeInsert, Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../common/base/entity/base.entity';
import * as bcrypt from 'bcryptjs';
import { Exclude, Expose } from 'class-transformer';

@Entity('users')
@Exclude()
export class UserEntity extends BaseEntity {

  @Column('text', { unique: true })
  @Expose()
  readonly username: string;

  @Column('text')
  private password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }
}
