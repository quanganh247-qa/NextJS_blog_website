import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

type NavmobileProps = {
  ItemNavMenu: {
    title: string;
    url: string;
  }[];
};

const NavMobile = ({ ItemNavMenu }: NavmobileProps) => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden block">
        <Menu
          size={24}
          className="text-gray-600 hover:text-gray-800 cursor-pointer w-6 h-6 margin-right-2"
        />
      </SheetTrigger>
      <SheetContent className="flex flex-col items-center">
        <SheetTitle className="text-2xl font-semibold text-gray-800 mb-6">
          Menu
        </SheetTitle>
        <main className="w-full max-w-md">
          <nav className="flex flex-col gap-4">
            {ItemNavMenu.map((item, index) => (
              <SheetDescription key={index}>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-blue-600 border-primary-600 hover:bg-blue-100"
                >
                  {item.title}
                </Button>
              </SheetDescription>
            ))}
          </nav>

          <nav className="flex justify-center gap-2 mt-10 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              className="text-black-600 border-primary-600 hover:bg-blue-100"
            >
              Sign in
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-black-600 border-primary-600 hover:bg-blue-100"
            >
              Sign up
            </Button>
          </nav>
        </main>
      </SheetContent>
    </Sheet>
  );
};

export default NavMobile;
