import { User } from '@modules/user/entities/user.entity';
import { UserRepository as IUserRepository } from '@modules/user/repositories/user.repository';
import { Repository } from 'typeorm';

import { CustomRepository } from '../database.decorator';

@CustomRepository(User)
export class UserRepository
  extends Repository<User>
  implements IUserRepository {}
