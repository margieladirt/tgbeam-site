import type { Metadata } from "next";
import ShopContent from "@/app/components/ShopContent";

export const metadata: Metadata = {
  title: "Shop — TGBEAM",
  description: "Limited edition TGBEAM merch designed by Leeann Huang.",
};

export default function Shop() {
  return <ShopContent />;
}
