"use client";

import { StatsProvider } from '../context/StatsContext';
import '../styles/StatsPage.css';

export default function StatsPage({ children }) {
  return (
    <StatsProvider>
      {children}
    </StatsProvider>
  );
}