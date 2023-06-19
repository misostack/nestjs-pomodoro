import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '@database/repositories/user.repository-impl';

@Injectable()
export class UserService {
  constructor(@Inject(UserRepository) private userRepository: UserRepository) {
    console.log(this.userRepository);
  }
  search() {
    return this.userRepository.search();
  }
}
