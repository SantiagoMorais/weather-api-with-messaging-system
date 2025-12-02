import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { PokemonApiGateway } from "./gateways/pokemon-api-gateway.service";

@Module({
  imports: [HttpModule],
  controllers: [PokemonApiGateway],
  providers: [PokemonApiGateway],
})
export class AppModule {}
