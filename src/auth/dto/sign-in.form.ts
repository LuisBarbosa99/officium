import { IsNotEmpty } from "class-validator";

export class SignInForm {

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;

}