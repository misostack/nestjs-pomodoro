import { User } from '@modules/user/entities/user.entity';
import { Repository } from 'typeorm';

export interface UserRepository extends Repository<User> {}
