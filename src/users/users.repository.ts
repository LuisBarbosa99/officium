import { Repository, EntityRepository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { User } from './users.entity';
import { AuthCredentialsDto } from 'src/auth/dto/auth-credentials.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<{type: number}> {
    const { email, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt();

    const user = this.create();
    user.name = authCredentialsDto.name;
    user.email = email;
    user.salt = salt;
    user.password = await this.hashPassword(password, user.salt);
    user.type = authCredentialsDto.type;

    try {
      await user.save();
    } catch (error) {
      if (error.code === '23505')
        throw new ConflictException('Usuário já existe');
      else throw new InternalServerErrorException();
    }
    return {type: user.type};
  }

  async validateUserPassword(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<User> {
    const { email, password } = authCredentialsDto;
    const user = await this.findOne({ email });

    if (user && (await user.validatePassword(password))) {
      return user;
    } else {
      return null;
    }
  }

  private async hashPassword(password: string, salt: string) {
    return bcrypt.hash(password, salt);
  }
}
