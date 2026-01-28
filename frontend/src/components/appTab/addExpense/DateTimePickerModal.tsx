import React, { useMemo, useState } from 'react';
import { Modal, View, Text, Pressable, StyleSheet, ScrollView, TextInput, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';

type Props = {
  visible: boolean;
  initialDate: Date;
  onClose: () => void;
  onConfirm: (d: Date) => void;
};

export const DateTimePickerModal: React.FC<Props> = ({
  visible,
  initialDate,
  onClose,
  onConfirm,
}) => {
  // Internal UI state (UI-only)
  const [viewYear, setViewYear] = useState(initialDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(initialDate.getMonth()); // 0..11
  const [selectedDay, setSelectedDay] = useState(initialDate.getDate());

  // 12h
  const initH = initialDate.getHours();
  const [hour, setHour] = useState(((initH + 11) % 12) + 1); // 1..12
  const [minute, setMinute] = useState(initialDate.getMinutes());
  const [ampm, setAmpm] = useState(initH >= 12 ? 'PM' as const : 'AM' as const);

  const monthLabel = useMemo(() => {
    const dt = new Date(viewYear, viewMonth, 1);
    return dt.toLocaleString(undefined, { month: 'long', year: 'numeric' });
  }, [viewMonth, viewYear]);

  const daysGrid = useMemo(() => {
    const first = new Date(viewYear, viewMonth, 1);
    const startWeekday = (first.getDay() + 7) % 7; // 0=Sun
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const cells: { day?: number; key: string }[] = [];

    for (let i = 0; i < startWeekday; i++) cells.push({ key: `blank-${i}` });
    for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d, key: `d-${d}` });

    // pad to fill the order
    const remainder = cells.length % 7;
    if (remainder !== 0) {
      const pad = 7 - remainder;
      for (let i = 0; i < pad; i++) cells.push({ key: `pad-${i}` });
    }
    return cells;
  }, [viewMonth, viewYear]);

  const BORDER = (Colors as any).border ?? 'rgba(255,255,255,0.06)';
  const overlayBg = 'rgba(0,0,0,0.55)';
  const tileBgSelected = 'rgba(0,200,83,0.18)';

  function prevMonth() {
    const m = viewMonth - 1;
    if (m < 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else setViewMonth(m);
  }
  function nextMonth() {
    const m = viewMonth + 1;
    if (m > 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else setViewMonth(m);
  }

  function confirm() {
    let h24 = hour % 12;
    if (ampm === 'PM') h24 += 12;
    const result = new Date(viewYear, viewMonth, selectedDay, h24, minute, 0, 0);
    onConfirm(result);
    onClose();
  }

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={[styles.overlay, { backgroundColor: overlayBg }]} onPress={onClose}>
        {/* Block the event below the panel. */}
      </Pressable>

      <View style={[styles.panelWrap]} pointerEvents="box-none">
        <View style={[styles.panel, { backgroundColor: Colors.surface, borderColor: BORDER }]}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Select Date & Time</Text>
            <Pressable hitSlop={8} onPress={onClose}>
              <Ionicons name="close" color="#FFFFFF" size={20} />
            </Pressable>
          </View>

          {/* Month nav */}
          <View style={styles.monthBar}>
            <Pressable onPress={prevMonth} style={styles.navBtn}>
              <Ionicons name="chevron-back" size={18} color="#FFFFFF" />
            </Pressable>
            <Text style={styles.monthText}>{monthLabel}</Text>
            <Pressable onPress={nextMonth} style={styles.navBtn}>
              <Ionicons name="chevron-forward" size={18} color="#FFFFFF" />
            </Pressable>
          </View>

          {/* Calendar grid */}
          <View style={styles.weekHeader}>  
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((w, i) => (
              <Text key={`${w}-${i}`} style={styles.weekHeadText}>      
              {w}    
              </Text>))}</View>

          <ScrollView style={{ maxHeight: 270 }} contentContainerStyle={{ paddingBottom: 8 }}>
            <View style={styles.grid}>
              {daysGrid.map((cell) => {
                if (!cell.day) return <View key={cell.key} style={styles.dayCell} />;
                const isSelected = cell.day === selectedDay;
                return (
                  <Pressable
                    key={cell.key}
                    style={[
                      styles.dayCell,
                      isSelected && { backgroundColor: tileBgSelected, borderColor: Colors.primary, borderWidth: 1 },
                    ]}
                    onPress={() => setSelectedDay(cell.day!)}
                  >
                    <Text style={[styles.dayText, isSelected && { color: '#FFFFFF', fontWeight: '700' }]}>
                      {cell.day}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </ScrollView>

          {/* Time picker (UI-only) */}
          <View style={styles.timeRow}>
            <Text style={styles.timeLabel}>Time</Text>
            <View style={styles.timeBox}>
              <TextInput
                keyboardType="number-pad"
                value={String(hour).padStart(2, '0')}
                onChangeText={(t) => {
                  const v = Math.max(1, Math.min(12, parseInt(t || '0', 10)));
                  if (!Number.isNaN(v)) setHour(v);
                }}
                style={styles.timeInput}
                maxLength={2}
              />
              <Text style={styles.timeColon}>:</Text>
              <TextInput
                keyboardType="number-pad"
                value={String(minute).padStart(2, '0')}
                onChangeText={(t) => {
                  const v = Math.max(0, Math.min(59, parseInt(t || '0', 10)));
                  if (!Number.isNaN(v)) setMinute(v);
                }}
                style={styles.timeInput}
                maxLength={2}
              />
              <View style={styles.ampmWrap}>
                <Pressable
                  onPress={() => setAmpm('AM')}
                  style={[styles.ampmBtn, ampm === 'AM' && { backgroundColor: Colors.primary }]}
                >
                  <Text style={[styles.ampmText, ampm === 'AM' && { color: '#0B0E0C', fontWeight: '700' }]}>AM</Text>
                </Pressable>
                <Pressable
                  onPress={() => setAmpm('PM')}
                  style={[styles.ampmBtn, ampm === 'PM' && { backgroundColor: Colors.primary }]}
                >
                  <Text style={[styles.ampmText, ampm === 'PM' && { color: '#0B0E0C', fontWeight: '700' }]}>PM</Text>
                </Pressable>
              </View>
            </View>
          </View>

          {/* Actions */}
          <View style={styles.footer}>
            <Pressable onPress={onClose} style={[styles.btnOutline, { borderColor: BORDER }]}>
              <Text style={styles.btnOutlineText}>Cancel</Text>
            </Pressable>
            <Pressable onPress={confirm} style={[styles.btnPrimary, { backgroundColor: Colors.primary }]}>
              <Text style={styles.btnPrimaryText}>Confirm</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { ...StyleSheet.absoluteFillObject },
  panelWrap: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  panel: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  headerTitle: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  monthBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
    marginBottom: 8,
  },
  monthText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  navBtn: {
    width: 32, height: 32, borderRadius: 8,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  weekHeader: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 6, paddingHorizontal: 6 },
  weekHeadText: { color: Colors.textGray, width: 36, textAlign: 'center' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'space-between', paddingHorizontal: 2 },
  dayCell: {
    width: 36, height: 36, borderRadius: 18,
    alignItems: 'center', justifyContent: 'center',
  },
  dayText: { color: '#E6EFE9' },
  timeRow: { marginTop: 6 },
  timeLabel: { color: Colors.textGray, marginBottom: 6 },
  timeBox: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
  },
  timeInput: {
    width: 44, height: 36, borderRadius: 8,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    color: '#FFFFFF', textAlign: 'center', fontWeight: '700',
  },
  timeColon: { color: '#FFFFFF', fontWeight: '700' },
  ampmWrap: {
    flexDirection: 'row', borderRadius: 8, overflow: 'hidden',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)',
  },
  ampmBtn: {
    paddingVertical: 8, paddingHorizontal: 10,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  ampmText: { color: '#FFFFFF' },
  footer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 14 },
  btnOutline: {
    flex: 1, height: 44, borderRadius: 12, borderWidth: 1,
    alignItems: 'center', justifyContent: 'center', marginRight: 10,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  btnOutlineText: { color: '#FFFFFF', fontWeight: '600' },
  btnPrimary: {
    flex: 1, height: 44, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
  },
  btnPrimaryText: { color: '#0B0E0C', fontWeight: '700' },
});