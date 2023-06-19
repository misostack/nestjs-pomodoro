import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '@shared/base.entity';

enum Gender {
  Male = 1,
  Female = 2,
  Unknown = 3,
}

enum UserStatus {
  Inactive = 0,
  Active = 1,
}

@Entity({
  name: 'user',
})
class User extends BaseEntity {
  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }

  @Index('uq_user_email', {
    unique: true,
  })
  @Column({
    length: 80,
    nullable: false,
  })
  email: string;

  @Index('uq_user_username', {
    unique: true,
  })
  @Column({
    length: 60,
    nullable: false,
  })
  username: string;

  @Column({
    length: 60,
    nullable: false,
  })
  password: string;

  @Column({
    length: 120,
    nullable: false,
  })
  fullname: string;

  @Column({
    type: 'date',
    nullable: true,
    default: null,
  })
  dob: Date; // YYYY-MM-DD

  @Column({
    type: 'enum',
    enum: Gender,
    nullable: true,
    default: Gender.Unknown,
  })
  gender: Gender;

  @Column({
    type: 'enum',
    enum: UserStatus,
    nullable: true,
    default: UserStatus.Inactive,
  })
  status: UserStatus;
}

export { User, Gender, UserStatus };
