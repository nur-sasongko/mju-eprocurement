import { APP_BRANDING } from "@/shared/utils/branding";
import { Phone, Mail, Clock, MapPin } from "lucide-react";
import Image from "next/image";

export function CompanyInfo() {
  return (
    <div className="space-y-8 flex flex-col">
      {/* Logo and Company Name */}
      <div className="space-y-4">
        <Image
          src={"/static/logo/muj.png"}
          alt="Logo MUJ"
          width={88}
          height={40}
        />

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">E-Procurement</h1>
          <h2 className="text-3xl font-bold text-gray-900">{APP_BRANDING.name}</h2>
        </div>
      </div>

      {/* Description */}
      <div className="text-gray-600 text-sm leading-relaxed">
        <p>
          Arcu sodales id orci augue. Libero arcu vitae aliquam tempor sit enim
          hendrerit. In donec gravida natoque consequat dictum erat in proin
          libero. Ultrices id nibh orci diam praesent. Libero vestibulum felis et
          pellentesque fermentum ut.
        </p>
      </div>

      {/* Contact Information */}
      <div className="flex space-y-6 mt-16">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Kontak Kami</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Phone className="h-4 w-4 text-gray-500" />
              <span className="text-gray-700 text-sm">(022) {APP_BRANDING.tel}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="h-4 w-4 text-gray-500" />
              <span className="text-gray-700 text-sm">{APP_BRANDING.email}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-gray-700 text-sm">Buka Senin - Kamis (08:00 - 16:00)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Addresess */}
      <div className="grid grid-cols-2 gap-3">
        {Object.values(APP_BRANDING.addresses).map((item) => (
          <div key={item.label}>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{item.label}</h3>
            <div className="flex items-start space-x-3">
              <div>
                <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
              </div>
              <div className="text-gray-700 text-sm leading-relaxed">
                <p>{item.address}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
