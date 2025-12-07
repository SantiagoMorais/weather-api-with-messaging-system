import type { INavigationRoutes } from "@/core/interfaces/navigation-routes";

export const navigationRoutes: INavigationRoutes[] = [
  {
    name: "home",
    path: "/",
  },
  {
    name: "previsão",
    path: "/previsao",
  },
  {
    name: "pokemons",
    path: "/pokemons",
    routes: [
      {
        path: "./pokemons/:pokemon",
      },
    ],
  },
];
