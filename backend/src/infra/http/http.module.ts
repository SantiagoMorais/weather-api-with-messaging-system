import { Module } from "@nestjs/common";
import { UserModule } from "./modules/user/user.module";
import { PokemonModule } from "./modules/pokemon/pokemon.module";
import { WeatherLogModule } from "./modules/weather-log/weather-log.module";

@Module({
  imports: [UserModule, PokemonModule, WeatherLogModule],
})
export class HttpModule {}
