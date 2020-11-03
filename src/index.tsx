import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import zxcvbn from 'zxcvbn';

interface Props {
  password: string;
  radius?: number;
  height?: number;
  showStrenghtText?: boolean;
  unfilledColor?: string;
}

const PasswordStrengthMeterBar: React.FC<Props> = ({
  password,
  radius = 4,
  height = 8,
  showStrenghtText = true,
  unfilledColor = '#F0F0F0',
}) => {
  const [result, setResult] = useState<number>(0);
  const [testedResult, setTestedResult] = useState<number>(0);
  const [color, setColor] = useState<string>('#F25F5C');
  const [label, setLabel] = useState<string>('');
  const [firstMount, setFirstMount] = useState<number>(0);

  const calculaterPercentage = (value: number) => {
    switch (value) {
      case 0:
        return 0;
      case 1:
        return 0.25;
      case 2:
        return 0.5;
      case 3:
        return 0.75;
      case 4:
        return 1;
      default:
        return 0;
    }
  };

  const calculateBarColor = (value: number) => {
    switch (value) {
      case 0:
        return '#F25F5C';
      case 1:
        return '#F25F5C';
      case 2:
        return '#FFE066';
      case 3:
        return '#247BA0';
      case 4:
        return '#70C1B3';
      default:
        return '#F25F5C';
    }
  };

  const calculateLabel = (value: number) => {
    switch (value) {
      case 0:
        return 'Weak';
      case 1:
        return 'Weak';
      case 2:
        return 'Fair';
      case 3:
        return 'Good';
      case 4:
        return 'Strong';
      default:
        return 'Weak';
    }
  };

  useEffect(() => {
    setTestedResult(zxcvbn(password).score);
    setResult(calculaterPercentage(testedResult));
    setLabel(calculateLabel(testedResult));
    setColor(calculateBarColor(testedResult));
    setFirstMount(firstMount + 1);

    return () => {
      setFirstMount(0);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password]);

  return (
    <View style={{ marginTop: 5 }}>
      {testedResult > 0 || firstMount > 1 ? (
        <>
          <ProgressBar
            progress={result}
            width={null}
            height={height}
            color={color}
            unfilledColor={unfilledColor}
            borderColor="transparent"
            borderRadius={radius}
          />
          {showStrenghtText && <Text style={{ color }}>{label}</Text>}
        </>
      ) : (
        <View />
      )}
    </View>
  );
};

export default PasswordStrengthMeterBar;
