export interface INavigationRoute {
  name: string;
  path: string;
}

export interface INavigationRoutes extends INavigationRoute {
  routes?: Pick<INavigationRoute, "path">[];
}
