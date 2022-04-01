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
    color: colors.black,
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textInputView: {
    width: '100%',
    backgroundColor: colors.grey600,
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
    color: colors.black,
    fontSize: 14,
    textAlign: 'center',
  }
});
