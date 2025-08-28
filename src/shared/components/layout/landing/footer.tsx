import React from 'react';
import BrandingIcon from "@/shared/components/branding/branding-icon";
import { InstagramIcon } from "@/shared/components/icons/instagram";
import { LinkedinIcon } from "@/shared/components/icons/linkedin";
import { FacebookIcon } from "@/shared/components/icons/facebook";
import { YoutubeIcon } from "@/shared/components/icons/youtube";
import { APP_BRANDING } from "@/shared/utils/branding";
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="w-full bg-transparent mt-auto py-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between gap-8 px-4 max-w-6xl">
        {/* Left: Logo + About */}
        <div className="flex flex-col gap-2 w-full md:w-1/3">
          <div className="flex items-center gap-2">
            <BrandingIcon />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            PT Migas Utama Jabar (MUJ) merupakan Badan Usaha Milik Daerah (BUMD) Pemerintah Provinsi Jawa Barat yang bergerak dalam bidang Eksplorasi & Produksi Migas serta Penunjang Energi.
          </p>
          {/* Social Icons */}
          <div className="flex gap-3 mt-2">
            <Link
              href={APP_BRANDING.social_medias.instagram}
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#E6EBF0] p-1 rounded-md"
            >
              <InstagramIcon className="w-[22px] h-[22px]" />
            </Link>
            <Link
              href={APP_BRANDING.social_medias.linkedin}
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#E6EBF0] p-1 rounded-md"
            >
              <LinkedinIcon className="w-[22px] h-[22px]" />
            </Link>
            <Link
              href={APP_BRANDING.social_medias.facebook}
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#E6EBF0] p-1 rounded-md"
            >
              <FacebookIcon className="w-[22px] h-[22px]" />
            </Link>
            <Link
              href={APP_BRANDING.social_medias.youtube}
              aria-label="YouTube"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#E6EBF0] p-1 rounded-md"
            >
              <YoutubeIcon className="w-[22px] h-[22px]" />
            </Link>
          </div>
        </div>
        {/* Middle: Contact */}
        <div className="w-full md:w-1/3">
          <div className="font-bold text-sm mb-2">Hubungi Kami</div>
          <div className="text-sm text-gray-700">
            <div>(022) {APP_BRANDING.tel}</div>
            <div>{APP_BRANDING.email}</div>
            <div>Buka Senin - Jumat (08:00 - 17:00)</div>
          </div>
        </div>

        {/* Right: Address */}
        <div className="w-full md:w-1/3 space-y-2">
          {Object.values(APP_BRANDING.addresses).map((item, index) => (
            <div key={index} className="flex flex-col">
              <div className="font-bold text-sm mb-2">{item.label}</div>
              <div className="text-sm text-gray-700 mb-4">
                {item.address}
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
