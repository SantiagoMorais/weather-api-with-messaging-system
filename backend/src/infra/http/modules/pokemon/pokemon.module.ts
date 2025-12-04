import { Module } from "@nestjs/common";

import { HttpModule } from "@nestjs/axios";
import { PokemonGateway } from "src/domain/pokemon/application/gateways/pokemons.gateway";
import { GetPokemonByNameOrIdUseCase } from "src/domain/pokemon/application/use-cases/get-pokemon-by-name-or-id.usecase";
import { PokemonApiGatewayImplement } from "src/infra/gateways/pokemon-api-gateway-implement.service";
import { GetPokemonDetailsController } from "./models/controllers/get-pokemon-details.controller";

@Module({
  imports: [HttpModule],
  controllers: [GetPokemonDetailsController],
  providers: [
    GetPokemonByNameOrIdUseCase,
    {
      provide: PokemonGateway,
      useClass: PokemonApiGatewayImplement,
    },
  ],
})
export class PokemonModule {}
