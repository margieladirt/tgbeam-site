import type { Metadata } from "next";
import Link from "next/link";
import ClearCartOnMount from "@/app/components/ClearCartOnMount";

export const metadata: Metadata = {
  title: "Thank you — TGBEAM",
  description: "Your TGBEAM order has been received.",
};

export default function Success() {
  return (
    <section className="min-h-screen bg-white font-sans">
      <ClearCartOnMount />
      <div className="max-w-2xl mx-auto px-6 py-28 md:py-40 text-center space-y-6">
        <h1 className="text-sm md:text-base tracking-[0.22em] uppercase text-zinc-900">
          Thank you for your order.
        </h1>
        <p className="text-sm font-light text-zinc-600 leading-relaxed">
          You will receive a confirmation email shortly. For Tokyo handoff or
          shipping questions, contact TGBEAM at{" "}
          <a
            href="mailto:tolu@tgbeam.com"
            className="text-zinc-900 underline underline-offset-4 hover:opacity-60 transition-opacity"
          >
            tolu@tgbeam.com
          </a>{" "}
          or via Instagram at{" "}
          <a
            href="https://www.instagram.com/tgbeam_/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-900 underline underline-offset-4 hover:opacity-60 transition-opacity"
          >
            @tgbeam_
          </a>
          .
        </p>
        <Link
          href="/"
          className="inline-block pt-2 text-xs tracking-[0.22em] uppercase text-zinc-900 hover:opacity-50 transition-opacity"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}
