import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { SignInDTO } from "./dto/sign-in.dto";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @UsePipes(ValidationPipe)
  signUp(@Body() authCredetialsDto: AuthCredentialsDto): Promise<{type: number}> {
    return this.authService.signUp(authCredetialsDto);
  }

  @Post('/signin')
  signIn(
    @Body() authCredetialsDto: AuthCredentialsDto,
  ): Promise<SignInDTO> {
    return this.authService.singIn(authCredetialsDto);
  }
}
