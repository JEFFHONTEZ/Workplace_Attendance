declare function route(name: string, params?: any): string;
declare module NodeJS {
    interface Global {
        route: typeof route;
    }
}
