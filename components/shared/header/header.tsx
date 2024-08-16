import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import NavMobile from "./nav-mobile";
import AuthAvt from "./auth-avt";

const ItemNavMenu = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Blog",
    url: "/blog",
  },
];

const Header = () => {
  return (
    <header className="bg-white text-gray-800 shadow-md border-b border-gray-200 h-[60px] sticky top-0">
      <div className="max-w-screen-2xl container mx-auto h-full flex items-center justify-between">
        <nav className="space-x-4">
          <div className="flex items-center gap-3 md:flex hidden">
            <Link href="/" className="text-lg font-bold text-gray-800">
              Logo
            </Link>
            {ItemNavMenu.map((item, index) => (
              <Link
                key={index}
                href={item.url}
                className="text-gray-600 hover:text-gray-800"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </nav>
        <div className="flex items-center gap-2">
          <div className="md:flex hidden items-center gap-2">
            <AuthAvt />
          </div>
          <NavMobile ItemNavMenu={ItemNavMenu} />
        </div>
      </div>
    </header>
  );
};

export default Header;
