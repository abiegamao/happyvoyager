"use client";

import { useState } from "react";
import WaitlistModal from "./WaitlistModal";
import type { PlaybookConfig } from "@/data/playbooks/types";

export default function WaitlistCardButton({ playbook }: { playbook: PlaybookConfig }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-xs font-bold flex items-center gap-1 hover:gap-2 transition-all"
        style={{ color: playbook.catalog.accent }}
      >
        Join Waitlist →
      </button>

      {open && <WaitlistModal playbook={playbook} onClose={() => setOpen(false)} />}
    </>
  );
}
