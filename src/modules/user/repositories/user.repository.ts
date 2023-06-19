import { User } from '@modules/user/entities/user-entity';
import { Repository } from 'typeorm';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UserRepository extends Repository<User> {
  search();
}
