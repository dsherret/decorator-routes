import {Routes} from "./routes";

export function Get(route: string = null) {
    return (target: Routes, methodName: string, descriptor: TypedPropertyDescriptor<(obj: Object) => Promise<any>>) => {
        target.routeInitializations = target.routeInitializations || [];
        target.routeInitializations.push((instance) => {
            if (route == null) {
                route = methodName;
            }

            instance.router.get(instance.getPath(route), (req, res, next) => {
                return descriptor.value(req.params).then((result) => {
                    res.send(result);
                }).catch(err => next(err));
            });
        });
    };
}