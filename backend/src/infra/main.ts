import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DatabaseSeederService } from "./database/mongoose/database-seeder.service";
import { EnvService } from "./env/env.service";
import { Logger } from "@nestjs/common";
import { SwaggerService } from "./swagger/swagger.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const seeder = app.get(DatabaseSeederService);
  await seeder.run();

  const swaggerService = app.get(SwaggerService);
  swaggerService.setup(app);

  const envService = app.get(EnvService);
  const port = envService.get("PORT");

  app.enableCors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  });

  await app.listen(port);
  Logger.log(`Server running on http://localhost:${port}`, "Main");
  Logger.log(
    `Swagger docs available on http://localhost:${port}/docs`,
    "Swagger"
  );
}
bootstrap().catch(console.error);
