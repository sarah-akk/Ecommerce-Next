"use client";
import Image from "next/image";
import logoSrc from "@/assets/online-shop-website.png";
import { LogoProps } from "@/types/types";

export function Logo({ size = 80, onClick }: LogoProps) {
  return (
    <div
      className={`relative w-[${size}px] h-[${size}px] cursor-pointer transition-transform duration-300 hover:scale-105`}
      onClick={onClick}
    >
      <Image
        src={logoSrc}
        alt="Logo"
        width={size}
        height={size}
        className="object-cover "
      />
    </div>
  );
}
