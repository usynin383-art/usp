"use client";

import { useState, useEffect } from "react";
import { Button } from "./components/Button";
import { Modal } from "./components/Modal";
import { MonitorCard } from "./components/MonitorCard";
import { useMonitorStore } from "./store/useMonitorStore";
import { AddMonitorForm } from "./components/AddMonitorForm";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sites = useMonitorStore((state) => state.sites);
  const fetchSites = useMonitorStore((state) => state.fetchSites);
  const tickMetrics = useMonitorStore((state) => state.tickMetrics);

  useEffect(() => {
    fetchSites();
  }, [fetchSites]);

    useEffect(() => {
    const interval = setInterval(() => {
      useMonitorStore.getState().tickMetrics();
    }, 10000); 

    return () => clearInterval(interval);
  }, []);

  const Cards = (sites || []).map((site) => <MonitorCard key={site.id} site={site} />);

  return (
    <>
      <div className="mb-10">
        <Button onClick={() => setIsModalOpen(true)}>Add Site</Button>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Add Site Monitor"
          description="Add a new site to monitor"
        >
          <AddMonitorForm onSuccess={() => setIsModalOpen(false)} />
        </Modal>
      </div>
          
      {Cards}
    </>
  );
}
