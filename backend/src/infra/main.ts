import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DatabaseSeederService } from "./database/mongoose/database-seeder.service";
import { EnvService } from "./env/env.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const seeder = app.get(DatabaseSeederService);
  await seeder.run();

  const envService = app.get(EnvService);
  const port = envService.get("PORT");

  await app.listen(port);
}
bootstrap().catch(console.error);
