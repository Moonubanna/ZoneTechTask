import {NavigationActions, CommonActions} from '@react-navigation/native';
import {colors} from '../common/theme';
import moment from 'moment';

/**
 * Navigate to route
 * @param {NavigationNavigateActionPayload} params
 */
export function navigate(navigation, screen) {
  navigation.navigate(screen);
}

/**
 * Navigate to route
 * @param {NavigationNavigateActionPayload} params
 */
export function navigateWithParams(navigation, screen, params) {
  navigation.navigate(screen, params);
}

/**
 * Navigate back to previous route in history
 */
export function back(navigation) {
  navigation.goBack();
}

/* Clear Stack */
export function clearStack(navigation, screenName) {
  const resetAction = CommonActions.reset({
    index: 0,
    routes: [{name: screenName}],
  });
  navigation.dispatch(resetAction);
}
