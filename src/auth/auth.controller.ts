import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { SignInResponseDTO } from "./dto/sign-in-response.dto";
import { SignInForm } from "./dto/sign-in.form";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @UsePipes(ValidationPipe)
  signUp(@Body() authCredetialsDto: AuthCredentialsDto): Promise<{type: number}> {
    return this.authService.signUp(authCredetialsDto);
  }

  @Post('/signin')
  @UsePipes(ValidationPipe)
  signIn(
    @Body() form: SignInForm,
  ): Promise<SignInResponseDTO> {
    return this.authService.singIn(form);
  }
}
