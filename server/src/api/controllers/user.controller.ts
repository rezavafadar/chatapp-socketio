import { Controller, GET } from "../../libs/express-routing";

@Controller("/America")
class UserController {
  @GET("/test")
  getUsers(): void {
    console.log("reza");
  }
}
export const userController = new UserController();
