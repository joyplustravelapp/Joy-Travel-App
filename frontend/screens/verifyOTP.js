import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native-web";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { verifyOTP } from "../store/authSlice";
import Input from "../components/Input";
import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";

export default function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, email } = useSelector((state) => state.auth);

  const handleVerify = async () => {
    try {
      await dispatch(verifyOTP({ email, otp })).unwrap();
      navigate("/reset-password");
    } catch (err) {
      console.error("Failed to verify OTP:", err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify OTP</Text>
      <Input
        placeholder="Enter OTP"
        value={otp}
        onChangeText={setOtp}
        keyboardType="numeric"
        maxLength={6}
      />
      <ErrorMessage message={error} />
      <Button
        title={loading ? "Verifying..." : "Verify OTP"}
        onPress={handleVerify}
        disabled={loading}
      />
    </View>
  );
}
