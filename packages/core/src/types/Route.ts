export interface RouteItem {
  path: string;
  component: any; //TODO use React.Element
  authorizationRoles?: string | Array<string>;
  requiredAuthentication?: boolean;
  [key: string]: any;
  redirect?: string;
  pathTo?: string;
  collapse?: boolean;
  isHomeRoute?: boolean;
  views?: Array<RouteItem>;
}
