import type { Metadata } from "next";
import SuccessContent from "@/app/components/SuccessContent";

export const metadata: Metadata = {
  title: "Thank you — TGBEAM",
  description: "Your TGBEAM order has been received.",
};

export default function Success() {
  return <SuccessContent />;
}
