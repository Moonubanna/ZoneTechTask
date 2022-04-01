import {StyleSheet} from 'react-native';
import { WIDTH,HEIGHT } from '../../apicall/constants';
import {colors} from '../../common/theme';
export default StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    alignItems: 'center',
    padding: 10
  },
  textHeader: {
    color: colors.green500,
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textInputView: {
    width: WIDTH - 20,
    backgroundColor: colors.green100,
    borderRadius: 5,
    marginTop: 15,
  }
});
