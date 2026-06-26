"use client";

import { useState } from "react";
import { Button } from "./components/Button";
import { Modal } from "./components/Modal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">Проверка Modal Base:</h1>
      
      <Button variant="primary" onClick={() => setIsModalOpen(true)}>
        Открыть форму добавления
      </Button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Добавить новый монитор"
        description="Введите параметры сайта для отслеживания его доступности."
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Здесь на следующем этапе будет находиться наша интерактивная форма (Task 15).
          </p>
          <div className="flex gap-3 justify-end mt-6">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Отмена
            </Button>
            <Button variant="primary" onClick={() => setIsModalOpen(false)}>
              Сохранить
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
