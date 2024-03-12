"use client";
import AuthProvider from "./authProvider";
import { NextUIProvider } from "@nextui-org/react";

export default function AppProvider({ children }) {
  return (
    <AuthProvider>
      <NextUIProvider>{children}</NextUIProvider>
    </AuthProvider>
  );
}
