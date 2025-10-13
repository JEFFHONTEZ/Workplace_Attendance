// Build a map of route name -> route factory from generated route files
// This exposes a global `route(name, ...args)` function (like Ziggy) used across the app.
type AnyFn = (...args: any[]) => any;

const modules = import.meta.glob('../routes/**/index.ts', { eager: true }) as Record<string, any>;

const routeMap: Record<string, AnyFn> = {};

for (const path in modules) {
    const mod = modules[path];

    // path examples:
    // ../routes/index.ts -> top-level routes
    // ../routes/users/index.ts -> users.*
    const match = path.match(/\.\.\/routes\/(.*)\/index\.ts$/);

    if (match) {
        const namespace = match[1];
        for (const key of Object.keys(mod)) {
            routeMap[`${namespace}.${key}`] = mod[key];
        }
    } else {
        // top-level file (../routes/index.ts)
        for (const key of Object.keys(mod)) {
            routeMap[key] = mod[key];
        }
    }
}

function resolveRoute(name: string, ...args: any[]) {
    const fn = routeMap[name];
    if (!fn) {
        throw new Error(`Unknown route '${name}'`);
    }

    // Call the generated route function with the provided args.
    const result = fn(...args);

    // Generated route functions return objects like { url, method } or form definitions { action, method }
    if (result && typeof result === 'object') {
        // prefer url then action
        if ('url' in result) return result.url;
        if ('action' in result) return result.action;
    }

    // otherwise return the raw result
    return result;
}

// Expose globally for code that expects `route` to be a global function
(window as any).route = resolveRoute;

export default resolveRoute;
