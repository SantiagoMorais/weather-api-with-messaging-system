import { Module } from "@nestjs/common";

import { HttpModule } from "@nestjs/axios";
import { PokemonGateway } from "src/domain/pokemon/application/gateways/pokemons.gateway";
import { GetPokemonByNameOrIdUseCase } from "src/domain/pokemon/application/use-cases/get-pokemon-by-name-or-id.usecase";
import { PokemonApiGatewayImplement } from "src/infra/gateways/pokemon-api-gateway-implement.service";
import { GetPokemonDetailsController } from "./models/controllers/get-pokemon-details.controller";
import { FindAllPokemonsUseCase } from "src/domain/pokemon/application/use-cases/find-all-pokemons.usecase";
import { FindPokemonsPaginatedController } from "./models/controllers/find-pokemons-paginated.controller";
import { FindPokemonsByTypeController } from "./models/controllers/find-pokemons-by-type.controller";
import { FindAllPokemonsByTypeUseCase } from "src/domain/pokemon/application/use-cases/find-all-pokemons-by-type.usecase";

@Module({
  imports: [HttpModule],
  controllers: [
    GetPokemonDetailsController,
    FindPokemonsPaginatedController,
    FindPokemonsByTypeController,
  ],
  providers: [
    GetPokemonByNameOrIdUseCase,
    FindAllPokemonsUseCase,
    FindAllPokemonsByTypeUseCase,
    {
      provide: PokemonGateway,
      useClass: PokemonApiGatewayImplement,
    },
  ],
})
export class PokemonModule {}
