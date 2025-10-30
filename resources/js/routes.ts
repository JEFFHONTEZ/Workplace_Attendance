// Lightweight stubs for route helpers when Wayfinder is unavailable.
// They behave like stringable functions and expose a `.url` property for code paths that expect it.

type RouteLike = string & { url: string };

function makeRoute(path: string): RouteLike {
    const url = path;
    const fn: any = () => fn; // allow calling like dashboard()
    fn.url = url;
    fn.toString = () => url;
    fn.valueOf = () => url as any;
    if (typeof Symbol !== 'undefined' && (Symbol as any).toPrimitive) {
        fn[Symbol.toPrimitive] = () => url;
    }
    return fn as RouteLike;
}

export const home = () => makeRoute('/');
export const dashboard = () => makeRoute('/dashboard');
export const login = () => makeRoute('/login');
export const register = () => makeRoute('/register');
export const logout = () => makeRoute('/logout');
