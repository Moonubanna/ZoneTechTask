import {StyleSheet} from 'react-native';
import { WIDTH,HEIGHT } from '../../apicall/constants';
import {colors} from '../../common/theme';
export default StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10
  },
  textHeader: {
    color: colors.green500,
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textInputView: {
    width: WIDTH - 20,
    height: 45,
    justifyContent: 'center',
    backgroundColor: colors.green100,
    borderRadius: 5,
    marginTop: 15,
  },
  licenceComponent: {
    width: WIDTH - 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15
  },
  licencePreseble: {
    width: '40%',
    padding: 10,
    alignItems:'center',
    justifyContent:'center'
  },
  textLicence:{
    color: colors.green900,
    fontSize: 14,
    textAlign: 'center',
  }
});
