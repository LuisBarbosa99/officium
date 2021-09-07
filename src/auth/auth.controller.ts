import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthCredentialsDto } from "src/dto/auth-credentials.dto";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @UsePipes(ValidationPipe)
  signUp(@Body() authCredetialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredetialsDto);
  }

  @Post('/signin')
  signIn(
    @Body() authCredetialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.singIn(authCredetialsDto);
  }
}
