import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';
import { colors } from './theme';

export default (
  onSearchPress: any,
  name: string,
  widthPercent: any,
  marginTop: number,
) => (
  <Pressable
    onPress={onSearchPress}
    style={({pressed}) => [
      styles.container,
      {
        width: widthPercent,
        opacity: pressed ? 0.5 : 1,
        marginTop: marginTop,
      },
    ]}>
    <Text
      style={{
        color: colors.white,
        fontSize: 16,
      }}>
      {name}
    </Text>
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.color_accent,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 50,
    alignSelf: 'center',
  },
});
