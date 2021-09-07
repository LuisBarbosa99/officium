import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from 'src/dto/auth-credentials.dto';
import { UserRepository } from 'src/users/users.repository';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signUp(authCredentialsDto);
  }

  async singIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const id = await this.userRepository.validateUserPassword(
      authCredentialsDto,
    );

    if (!id) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload: JwtPayload = { id };

    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}