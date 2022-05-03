import React from 'react';
import AwesomeButton from 'react-native-really-awesome-button';
import COLORS from '../../services/colors';

const RectangularBtn = ({
  text,
  onClickFnc,
  width = 200,
  height = 55,
  margButton = 0,
}) => {
  return (
    <AwesomeButton
      style={{marginBottom: margButton}}
      borderRadius={11}
      height={height}
      width={width}
      raiseLevel={6}
      activityColor={COLORS.white}
      textColor={COLORS.white}
      backgroundColor={COLORS.blue}
      backgroundDarker={'#072947'}
      backgroundProgress={'#072947'}
      type={'primary'}
      onPress={onClickFnc}>
      {text}
    </AwesomeButton>
  );
};

export default React.memo(RectangularBtn);
