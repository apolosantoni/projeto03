import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';

const Timer = () => {
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [timer, setTimer] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [running, setRunning] = useState(false);

  const handleStart = () => {
    const totalSeconds =
      parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
    if (totalSeconds > 0) {
      setStartTime(new Date().getTime());
      setTimer(
        setInterval(() => {
          const now = new Date().getTime();
          setElapsedTime(now - startTime);
        }, 1),
      );
      setRunning(true);
    }
  };

  const handleStop = () => {
    clearInterval(timer);
    setRunning(false);
  };

  const handleReset = () => {
    clearInterval(timer);
    setHours('');
    setMinutes('');
    setSeconds('');
    setElapsedTime(0);
    setRunning(false);
  };

  const formatTime = time => {
    const milliseconds = time % 1000;
    const seconds = Math.floor(time / 1000) % 60;
    const minutes = Math.floor(time / (1000 * 60)) % 60;
    const hours = Math.floor(time / (1000 * 60 * 60));

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds
      .toString()
      .padStart(3, '0')}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.timerContainer}>
        <Text style={styles.label}>Temporizador:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Horas"
          value={hours}
          onChangeText={setHours}
        />
        <Text>:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Minutos"
          value={minutes}
          onChangeText={setMinutes}
        />
        <Text>:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Segundos"
          value={seconds}
          onChangeText={setSeconds}
        />
      </View>
      <View style={styles.controls}>
        <Button title="Iniciar" onPress={handleStart} disabled={running} />
        <Button title="Parar" onPress={handleStop} disabled={!running} />
        <Button title="Reiniciar" onPress={handleReset} />
      </View>
      <View style={styles.timerContainer}>
        <Text style={styles.label}>Cronômetro:</Text>
        <Text>{formatTime(elapsedTime)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  label: {
    marginRight: 5,
  },
  input: {
    width: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    textAlign: 'center',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
});

export default Timer;
