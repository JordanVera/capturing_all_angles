"use client";

import Link from "next/link";
import { BRAND } from "@/lib/site";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function MobileMenu({ open, onClose }: Props) {
  return (
    <div
      className={`fixed inset-0 z-[1500] bg-black transition-opacity duration-300 md:hidden ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <nav className="flex h-full flex-col justify-between px-8 pt-28 pb-24">
        <div className="flex flex-col gap-4">
          <Link href="/" onClick={onClose} className="t-nav text-foreground">
            home
          </Link>
          <Link href="/book" onClick={onClose} className="t-nav text-foreground">
            book
          </Link>
        </div>
        <p className="t-small text-muted">
          2026
          <br />
          {BRAND.name}
        </p>
      </nav>
    </div>
  );
}