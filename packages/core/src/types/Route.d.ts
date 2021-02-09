export interface RouteItem {
    path: string;
    component: any;
    authorizationRoles?: string | Array<string>;
    requiredAuthentication?: boolean;
    [key: string]: any;
    redirect?: string;
    pathTo?: string;
    collapse?: boolean;
    isHomeRoute?: boolean;
    views?: Array<RouteItem>;
}
