"use client";

import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import NavbarSidebar from "@/modules/home/ui/components/navbar-sidebar";
import { MenuIcon } from "lucide-react";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});

interface NavbarItemProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}

const NavbarItem = ({ children, href, isActive }: NavbarItemProps) => {
  return (
    <Button
      asChild
      variant="outline"
      className={cn(
        "bg-transparent hover:bg-transparent rounded-full border-transparent hover:border-primary px-3.5 text-lg",
        isActive && "bg-black text-white hover:bg-black hover:text-white"
      )}
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
};

const navbarItems = [
  { href: "/", children: "Home" },
  { href: "/about", children: "About" },
  { href: "/features", children: "Features" },
  { href: "/pricing", children: "Pricing" },
  { href: "/contact", children: "Contact" },
];

const Navbar = () => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const trpc = useTRPC();
  const session = useQuery(trpc.auth.session.queryOptions());

  return (
    <nav className="h-20 flex border-b justify-between font-medium bg-white">
      {/* Logo */}
      <Link href="/" className="pl-6 flex items-center">
        <span className={cn("text-5xl font-semibold", poppins.className)}>
          funroad
        </span>
      </Link>

      {/* Navbar Items */}
      <div className="items-center gap-4 hidden lg:flex">
        {navbarItems.map((item) => (
          <NavbarItem
            key={item.href}
            href={item.href}
            isActive={pathname === item.href}
          >
            {item.children}
          </NavbarItem>
        ))}
      </div>

      {session.data?.user ? (
        <div className="hidden lg:flex">
          <Button
            asChild
            className="border-0 border-l px-12 h-full rounded-none bg-black text-white hover:bg-pink-400 hover:text-black transition-colors ease-in-out duration-300 text-lg"
          >
            <Link href="/admin">Dashboard</Link>
          </Button>
        </div>
      ) : (
        <div className="hidden lg:flex">
          <Button
            asChild
            variant="secondary"
            className="border-0 border-l px-12 h-full rounded-none bg-white hover:bg-pink-400 transition-colors ease-in-out duration-300 text-lg"
          >
            <Link prefetch href="/sign-in">
              Log in
            </Link>
          </Button>
          <Button
            asChild
            className="border-0 border-l px-12 h-full rounded-none bg-black text-white hover:bg-pink-400 hover:text-black transition-colors ease-in-out duration-300 text-lg"
          >
            <Link prefetch href="/sign-up">
              Start selling
            </Link>
          </Button>
        </div>
      )}

      <NavbarSidebar
        items={navbarItems}
        open={isSidebarOpen}
        onOpenChange={setIsSidebarOpen}
      />

      <div className="flex lg:hidden items-center justify-center">
        <Button
          variant="ghost"
          onClick={() => setIsSidebarOpen(true)}
          className="size-12 border-transparent bg-white"
        >
          <MenuIcon />
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
