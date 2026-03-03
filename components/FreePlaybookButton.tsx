"use client";

import { useState } from "react";
import PlaybookAccessModal from "./PlaybookAccessModal";

export default function FreePlaybookButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <PlaybookAccessModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <button
        onClick={() => setIsModalOpen(true)}
        className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white border-2 border-[#3a3a3a] text-[#3a3a3a] font-bold hover:bg-[#3a3a3a] hover:text-white transition-all duration-300 cursor-pointer"
      >
        Start Here for Free →
      </button>
    </>
  );
}
