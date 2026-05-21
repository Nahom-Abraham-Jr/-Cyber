"use client";
import { useEffect } from "react";
import { useAppStore } from "@/store/appStore";

export default function LanguageSync() {
  const { language } = useAppStore();

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return null;
}
