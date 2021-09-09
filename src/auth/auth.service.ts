import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/users/users.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { SignInResponseDTO } from './dto/sign-in-response.dto';
import { SignInForm } from './dto/sign-in.form';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  signUp(authCredentialsDto: AuthCredentialsDto): Promise<{type: number}> {
    return this.userRepository.signUp(authCredentialsDto);
  }

  async singIn(
    form: SignInForm,
  ): Promise<SignInResponseDTO> {
    const user = await this.userRepository.validateUserPassword(
      form,
    );

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload: JwtPayload = { id: user.id };

    const accessToken = this.jwtService.sign(payload);

    var dto = new SignInResponseDTO;
    dto.accessToken = accessToken;
    dto.type = user.type;

    return dto;
  }
}