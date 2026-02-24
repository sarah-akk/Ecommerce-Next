"use client";

import { Logo } from "@/components/UI/Logo";
import { LINKS } from "@/lib/utils";
import { FootercontainerVariants, FooteritemVariants } from "@/lib/variants";
import { Divider, Link, Chip } from "@heroui/react";
import { motion } from "framer-motion";
import {
  Github,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  MapPin,
  Phone,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

const SOCIALS = [
  { icon: <Github className="h-4 w-4" />, href: "#", label: "GitHub" },
  { icon: <Twitter className="h-4 w-4" />, href: "#", label: "Twitter" },
  { icon: <Instagram className="h-4 w-4" />, href: "#", label: "Instagram" },
  { icon: <Youtube className="h-4 w-4" />, href: "#", label: "YouTube" },
];

const CONTACT = [
  { icon: <Mail className="h-4 w-4" />, text: "support@shopwave.com" },
  { icon: <Phone className="h-4 w-4" />, text: "+1 (800) 123-4567" },
  { icon: <MapPin className="h-4 w-4" />, text: "San Francisco, CA 94105" },
];

export function Footer() {
  return (
    <footer className="mt-20 border-t border-divider bg-content1">
      {/* Top Banner */}
      <div className="bg-secondary/10 border-b border-secondary/20 py-3 px-4">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-center gap-6 text-sm text-secondary-700 dark:text-secondary-300">
          <span className="flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" /> Free shipping on orders over
            $50
          </span>
          <Divider orientation="vertical" className="h-4 hidden sm:block" />
          <span className="flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" /> 30-day free returns
          </span>
          <Divider orientation="vertical" className="h-4 hidden sm:block" />
          <span className="flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" /> 2-year warranty on all products
          </span>
        </div>
      </div>

      {/* Main Footer */}
      <motion.div
        className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8"
        variants={FootercontainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          {/* Brand Column */}
          <motion.div
            variants={FooteritemVariants}
            className="lg:col-span-2 space-y-5"
          >
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <Logo size={30} onClick={() => (window.location.href = "/")} />
              <span className="text-xl font-bold tracking-tight text-foreground">
                ShopWave
              </span>
            </div>

            <p className="text-sm leading-relaxed text-default-500 max-w-xs">
              Discover curated collections from the world's finest brands.
              Quality, style, and sustainability — all in one place.
            </p>

            {/* Contact Info */}
            <ul className="space-y-2.5">
              {CONTACT.map(({ icon, text }) => (
                <li
                  key={text}
                  className="flex items-center gap-2.5 text-sm text-default-500"
                >
                  <span className="text-secondary">{icon}</span>
                  {text}
                </li>
              ))}
            </ul>

            {/* Socials */}
            <div className="flex items-center gap-2 pt-1">
              {SOCIALS.map(({ icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-divider bg-content2 text-default-500 transition-all hover:border-secondary/50 hover:bg-secondary/10 hover:text-secondary"
                >
                  {icon}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Links Columns */}
          {(
            [
              { title: "Shop", links: LINKS.shop },
              { title: "Support", links: LINKS.support },
              { title: "Company", links: LINKS.company },
            ] as const
          ).map(({ title, links }) => (
            <motion.div
              key={title}
              variants={FooteritemVariants}
              className="space-y-5"
            >
              <h3 className="text-xs font-semibold uppercase tracking-widest text-default-400">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map(
                  ({
                    label,
                    href,
                    badge,
                  }: {
                    label: string;
                    href: string;
                    badge?: string;
                  }) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="group flex items-center gap-2 text-sm text-default-600 transition-colors hover:text-secondary"
                      >
                        <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                        {label}
                        {badge && (
                          <Chip
                            size="sm"
                            color="secondary"
                            variant="flat"
                            classNames={{
                              base: "h-4",
                              content: "text-[10px] font-semibold px-1.5",
                            }}
                          >
                            {badge}
                          </Chip>
                        )}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Bottom Bar */}
      <Divider />
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-xs text-default-400">
            © {new Date().getFullYear()} ShopWave, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {["Privacy Policy", "Terms of Service", "Cookie Settings"].map(
              (item) => (
                <Link
                  key={item}
                  href="#"
                  className="text-xs text-default-400 hover:text-secondary transition-colors"
                >
                  {item}
                </Link>
              ),
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
