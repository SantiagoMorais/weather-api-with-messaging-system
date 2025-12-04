import { Module } from "@nestjs/common";
import { UserModule } from "./modules/user/user.module";
import { PokemonModule } from "./modules/pokemon/pokemon.module";

@Module({
  imports: [UserModule, PokemonModule],
})
export class HttpModule {}
