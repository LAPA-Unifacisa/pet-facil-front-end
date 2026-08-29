import { StyleSheet, View } from 'react-native';

import PillOption from './PillOption';

interface TimeSlotGridProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export default function TimeSlotGrid({ options, value, onChange }: TimeSlotGridProps) {
  return (
    <View style={styles.grid}>
      {options.map((option) => (
        <View key={option} style={styles.item}>
          <PillOption label={option} selected={option === value} onPress={() => onChange(option)} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  item: {
    flexBasis: '30%',
    flexGrow: 1,
  },
});
