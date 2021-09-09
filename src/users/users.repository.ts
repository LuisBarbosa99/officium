import { Repository, EntityRepository } from 'typeorm';
import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { User } from './users.entity';
import { AuthCredentialsDto } from 'src/auth/dto/auth-credentials.dto';
import { SignInForm } from 'src/auth/dto/sign-in.form';

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

    if (user.type == 0 && authCredentialsDto.phone) {
      throw new BadRequestException(authCredentialsDto.phone,'O telefone não é um atributo válido para usuários desse tipo.');
    }
    user.phone = authCredentialsDto.phone;

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
    form: SignInForm,
  ): Promise<User> {
    const { email, password } = form;
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
