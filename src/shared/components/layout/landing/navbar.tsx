import React from 'react';
import { Button } from "@/shared/components/ui/button";
import PATHS from "@/shared/utils/routes";
import { ArrowRightIcon } from "lucide-react";
import BrandingIcon from '../../branding/branding-icon';
import Link from 'next/link';

const Navbar = () => {
  return (
    <header className="w-full bg-transparent">
      <nav className="container mx-auto flex justify-between items-center py-5 px-4">
        <div className="flex items-center gap-2">
          <BrandingIcon />
        </div>
        <ul className="hidden md:flex items-center gap-5 text-[16px] font-medium">
          <li>
            <Link href="#" className="text-[#1976D2]">Beranda</Link>
          </li>
          <li>
            <Link href="#">Regulasi</Link>
          </li>
          <li>
            <Link href="#">Pengumuman Tender</Link>
          </li>
          <li>
            <Link href="#">Kontak Kami</Link>
          </li>
        </ul>
        <div className="flex items-center gap-3">
          <Link
            href={PATHS.PUBLIC.LOGIN}
          >
            <Button
              type="button"
              variant="ghost"
              className="hover:bg-transparent"
            >
              Masuk
            </Button>
          </Link>
          <Link
            href={PATHS.PUBLIC.REGISTER}
          >
            <Button
              type="button"
              variant="link"
              className="bg-gradient-to-r from-[#46B5FF] to-[#0886D9] text-sm font-medium flex items-center gap-1 mx-auto text-white"
            >
              Daftarkan Vendor
              <ArrowRightIcon className="h-3 w-3" />
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
