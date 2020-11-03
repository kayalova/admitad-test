import { NestFactory } from "@nestjs/core"
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger"

import { AppModule } from "./app.module"
import * as dotenv from 'dotenv'

dotenv.config({ path: `${__dirname}/../.env` })

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    const options = new DocumentBuilder()
        .setTitle("Currency documentation")
        .setDescription("The currency API description")
        .setVersion("1.0")
        .build()
    const document = SwaggerModule.createDocument(app, options)
    SwaggerModule.setup("api", app, document)

    await app.listen(3000)
}
bootstrap()
