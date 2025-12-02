import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { PokemonApiGatewayImplement } from "./gateways/pokemon-api-gateway-implement.service";

@Module({
  imports: [HttpModule],
  controllers: [PokemonApiGatewayImplement],
  providers: [PokemonApiGatewayImplement],
})
export class AppModule {}
