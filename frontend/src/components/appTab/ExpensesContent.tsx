import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ExpensesRow from "./ExpensesRow";
import { Colors } from '@/constants/colors';

export default function ExpensesContent() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.ele}>
        <Text style={styles.date}>TODAY</Text>

        <View style={styles.separatorLine} />

        <ExpensesRow expenseInfo={{
          name: 'Grocery Run',
          amount: 145.50,
          time: '8:45 PM',
          payer: 'You'
        }} />

        <View style={styles.separatorLine} />

        <ExpensesRow expenseInfo={{
          name: 'Uber to Hotel',
          amount: 15.60,
          time: '12:00 PM',
          payer: 'Tony'
        }} />

        <View style={styles.separatorLine} />
      </View>

      <View style={styles.ele}>
        <Text style={styles.date}>YESTERDAY</Text>

        <View style={styles.separatorLine} />

        <ExpensesRow expenseInfo={{
          name: 'Dinner at MC',
          amount: 20.8,
          time: '9:00 AM',
          payer: 'Thein'
        }} />

        <View style={styles.separatorLine} />

        <ExpensesRow expenseInfo={{
          name: 'Museum',
          amount: 78.5,
          time: '11:12 AM',
          payer: 'You'
        }} />

        <View style={styles.separatorLine} />

        <ExpensesRow expenseInfo={{
          name: 'Lunch at beach',
          amount: 210,
          time: '1:00 PM',
          payer: 'Tony'
        }} />

        <View style={styles.separatorLine} />
      </View>

      <View style={styles.ele}>
        <Text style={styles.date}>01/20/2025</Text>

        <View style={styles.separatorLine} />

        <ExpensesRow expenseInfo={{
          name: 'Drinks at Cirle K',
          amount: 12.9,
          time: '11:00 PM',
          payer: 'Thein'
        }} />

        <View style={styles.separatorLine} />

        <ExpensesRow expenseInfo={{
          name: 'Uber from Amherst to Boston',
          amount: 120,
          time: '10:00 AM',
          payer: 'You'
        }} />

        <View style={styles.separatorLine} />

        <ExpensesRow expenseInfo={{
          name: 'Happy Lamb',
          amount: 86,
          time: '7:00 PM',
          payer: 'Tony'
        }} />

        <View style={styles.separatorLine} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 14,
  },
  contentContainer: {
    paddingBottom: 10,
  },
  ele: {
    marginBottom: 22,
  },
  date: {
    color: Colors.textGray,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 6,
  },
  separatorLine: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.textGray,
    marginVertical: 2,
  },
});
