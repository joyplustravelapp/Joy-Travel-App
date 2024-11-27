import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const NumberKeyboard = ({ onKeyPress, onDelete, onClose }) => {
  const [input, setInput] = useState("");

  const handleKeyPress = (value) => {
    setInput((prev) => prev + value);
    if (onKeyPress) onKeyPress(value);
  };

  const handleDelete = () => {
    setInput((prev) => prev.slice(0, -1));
    if (onDelete) onDelete();
  };

  const KeyButton = React.memo(({ number, letters }) => {
    return (
      <TouchableOpacity
        style={styles.keyButton}
        onPress={() => number && handleKeyPress(number)}
      >
        <Text style={styles.keyText}>{number}</Text>
        {letters && <Text style={styles.keyLetters}>{letters}</Text>}
      </TouchableOpacity>
    );
  });

  const keys = [
    { number: "1", letters: "ABC" },
    { number: "2", letters: "DEF" },
    { number: "3", letters: "GHI" },
    { number: "4", letters: "JKL" },
    { number: "5", letters: "MNO" },
    { number: "6", letters: "PQRS" },
    { number: "7", letters: "TUV" },
    { number: "8", letters: "WXYZ" },
    { number: "9", letters: "" },
    { number: "", letters: "" },
    { number: "0", letters: "" },
  ];

  const DeleteButton = React.memo(() => (
    <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
      <Text style={styles.deleteText}>Delete</Text>
    </TouchableOpacity>
  ));

  return (
    <View style={styles.keyboardContainer}>
      <View style={styles.inputDisplay}>
        <Text style={styles.inputText}>{input}</Text>
      </View>
      <View style={styles.grid}>
        {keys.map((key, index) => (
          <KeyButton key={index} number={key.number} letters={key.letters} />
        ))}
        <DeleteButton />
      </View>
      <TouchableOpacity onPress={onClose} style={styles.doneButton}>
        <Text style={styles.doneText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  keyboardContainer: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  inputDisplay: {
    marginBottom: 10,
  },
  inputText: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  keyButton: {
    width: "30%",
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 8,
  },
  keyText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  keyLetters: {
    fontSize: 12,
    color: "#888",
  },
  deleteButton: {
    // Style for delete button
    backgroundColor: "#ffcccc",
    width: "30%",
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginBottom: 8,
    // Add more styles as needed
    // ...
  },
  deleteText: {
    color: "#ff0000",
  },
  doneButton: {
    marginTop: 5,
    paddingVertical: 10,
    backgroundColor: "#007BFF",
    borderRadius: 10,
  },
  doneText: {
    color: "#ffffff",
    textAlign: "center",
  },
});

export default NumberKeyboard;
