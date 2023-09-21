import { Controller, HttpCode, Options } from "@nestjs/common";
import { NoAuthRequired } from "./users/decorators/auth.decorator";


@Controller()
export class AppController {

	@Options('*')
	@NoAuthRequired()
	@HttpCode(204)
	handlePreflight() {

	}
}