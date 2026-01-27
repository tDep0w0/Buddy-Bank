import { View, StyleSheet, Text } from 'react-native';
import { Colors } from '@/constants/colors'

type Expense = {
  my: number;
  total: number;
};

export default function HeaderExpenses({expense} : {expense: Expense}){
  return (
    <View style={styles.container}>
      <View style={styles.ele}>
        <Text style={styles.title}>MY EXPENSES</Text>
        <Text style={styles.my}>${expense.my}</Text>
      </View>
      <View style={styles.ele}>
        <Text style={styles.title}>TOTAL EXPENSES</Text>
        <Text style={styles.total}>${expense.total}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 12,
  },
  ele: {
    borderWidth: 1,
    borderColor: '#aaa',
    backgroundColor: Colors.surface,
    marginHorizontal: 4,
    paddingVertical: 18,
    flex: 1,
    justifyContent: 'center',
    borderRadius: 20,
  },
  title: {
    fontSize: 14,
    color: Colors.textGray,
    fontWeight: '600',
    marginLeft: 16,
    marginBottom: 4,
  },
  my: {
    fontSize: 28,
    color: Colors.primary,
    fontWeight: '800',
    marginLeft: 16,
  },
  total: {
    fontSize: 28,
    color: 'white',
    fontWeight: '800',
    marginLeft: 16,
  },
});

