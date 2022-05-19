import { CommonActions, NavigationContainerRef, NavigationState, PartialState, Route, StackActions } from '@react-navigation/native';

type AllRoutes = any;

declare type ResetState = PartialState<NavigationState> | NavigationState | (Omit<NavigationState, 'routes'> & {
    routes: Omit<Route<string>, 'key'>[];
});
export default class NavigationService {
    static topLevelNavigator?: NavigationContainerRef<any>;

    static setTopLevelNavigator = (ref: NavigationContainerRef<any>) => NavigationService.topLevelNavigator = ref;

    static reset = (resetState: ResetState | undefined) => {
        if (NavigationService.topLevelNavigator) {
            NavigationService.topLevelNavigator.dispatch(
                CommonActions.reset(resetState)
            );
        }
    };

    static navigate = (routeName: keyof AllRoutes, params?: any) => {
        if (NavigationService.topLevelNavigator && routeName) {
            NavigationService.topLevelNavigator.dispatch(
                CommonActions.navigate({
                    name: routeName.toString(),
                    params
                })
            );
        }
    };

    static push = (routeName: keyof AllRoutes, params?: any) => {
        if (NavigationService.topLevelNavigator && routeName) {
            NavigationService.topLevelNavigator.dispatch(
                StackActions.push(routeName.toString(), params)
            );
        }
    };

    static pop = () => {
        if (NavigationService.topLevelNavigator) {
            NavigationService.topLevelNavigator.dispatch(
                CommonActions.goBack()
            );
        }
    };

    static popToTop = () => {
        if (NavigationService.topLevelNavigator) {
            NavigationService.topLevelNavigator.dispatch(
                StackActions.popToTop()
            );
        }
    };

    static replace = (routeName: keyof AllRoutes, params?: any) => {
        if (NavigationService.topLevelNavigator) {
            NavigationService.topLevelNavigator.dispatch(
                StackActions.replace(routeName.toString(), params)
            );
        }
    };
}
