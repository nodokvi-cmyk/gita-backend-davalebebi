import { forwardRef, Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { MongooseModule } from "@nestjs/mongoose";
import { userSchema } from "./schema/user.schema";
import { ProductsModule } from "../products/products.module";


@Module({
    imports: [
        MongooseModule.forFeature([
            {name: "user", schema: userSchema}
        ]),
        forwardRef(() => ProductsModule)
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule{}