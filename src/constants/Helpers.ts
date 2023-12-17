import {CommonActions, NavigationProp} from '@react-navigation/native';

function isEmptyString(value: string) {
  return !value || value === '';
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isEmptyArray(value: any[]) {
  return !value || value.length === 0;
}

function resetAndGo(
  navigation: NavigationProp<any>,
  routeName: string,
  routeParams?: any,
) {
  if (navigation && !isEmptyString(routeName)) {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: routeName,
            params: routeParams || {},
          },
        ],
      }),
    );
  }
}

export {isEmptyString, resetAndGo, isValidEmail, isEmptyArray};
