import Image from "next/image";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { StatusBadge } from "./components/StatusBadge";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 p-8">
      <h1 className="text-xl font-bold">Проверка StatusBadge:</h1>
      <div className="flex gap-4">
        <StatusBadge status="up" />
        <StatusBadge status="warning" />
        <StatusBadge status="down" />
      </div>
    </div>
  );
}
