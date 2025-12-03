import { INestApplication, Injectable } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

@Injectable()
export class SwaggerService {
  setup(app: INestApplication) {
    const config = new DocumentBuilder()
      .setTitle("Gdash API")
      .setDescription(
        "API documentation for Gdash project. This documentation just contain the routes possible status code returns and the body format. "
      )
      .setVersion("1.0")
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("docs", app, document);
  }
}
