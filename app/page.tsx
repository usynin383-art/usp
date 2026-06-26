"use client";

import { useState } from "react";
import { Button } from "./components/Button";
import { Modal } from "./components/Modal";
import { MonitorCard } from "./components/MonitorCard";
import { useMonitorStore } from "./store/useMonitorStore";

export default function Home() {
  const sites = useMonitorStore((state) => state.sites);

  const Cards = sites.map((site) => <MonitorCard key={site.id} site={site} />);

  return (
    Cards
  );
}
