import Link from "next/link";
import { cn } from "@/lib/cn";

export default function LandingPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="container mx-auto flex flex-col items-center justify-center flex-1 px-4 py-12 md:py-24">
        <div className="max-w-2xl text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Portal <span className="text-[#1976D2]">Informasi Tender</span> untuk <br />Transparansi dan Aksesibilitas
          </h1>
          <p className="text-gray-600 mb-8">
            Vendor dapat dengan mudah menemukan peluang baru, Pembeli dapat mengakses informasi vendor terpercaya. Semua dalam satu platform yang terintegrasi.
          </p>
          <Link
            href="/auth/register"
            className="bg-[#1976D2] hover:bg-[#1565C0] text-white font-semibold px-6 py-3 rounded transition text-lg"
          >
            Daftar Sebagai Vendor
          </Link>
        </div>
      </section>

      {/* Tender Info Table */}
      <section className="container mx-auto px-4 py-10">
        <div className="bg-white bg-opacity-90 rounded-xl shadow-lg p-8 max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-6">
            Informasi <span className="text-[#1976D2]">Tender</span>
          </h2>
          {/* Tabs */}
          <div className="flex justify-center mb-8 gap-2">
            <button
              className={cn(
                "px-4 py-2 rounded-lg font-medium text-[#1976D2] bg-blue-50 shadow-inner transition"
              )}
            >
              Pengumuman Tender
            </button>
            <button
              className={cn(
                "px-4 py-2 rounded-lg font-medium text-gray-400 bg-gray-100"
              )}
              disabled
            >
              10 Tender Terakhir
            </button>
          </div>
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-y-2">
              <thead>
                <tr className="text-gray-700 text-sm bg-gray-100">
                  <th className="p-3 rounded-l-lg text-left">No</th>
                  <th className="p-3 text-left">No. Pengadaan</th>
                  <th className="p-3 text-left">Judul Pekerjaan</th>
                  <th className="p-3 text-left">Tgl. Pendaftaran</th>
                  <th className="p-3 text-left">Kode Komoditas</th>
                  <th className="p-3 rounded-r-lg text-left">Tgl. Kirim Penawaran</th>
                </tr>
              </thead>
              <tbody>
                {[
                  1, 2, 3, 4, 5
                ].map((num) => (
                  <tr key={num} className="bg-white text-sm shadow-sm rounded-lg">
                    <td className="p-3">{num}</td>
                    <td className="p-3">RFQ_202508.00647</td>
                    <td className="p-3">
                      Pengadaan Jasa Lainnya -<br />
                      Layanan Internet Backup Link untuk Kantor Pusat
                    </td>
                    <td className="p-3">
                      27 Aug 25, 10:00 -<br />29 Aug 25, 10:00
                    </td>
                    <td className="p-3">8111</td>
                    <td className="p-3">
                      27 Aug 25, 10:00 -<br />29 Aug 25, 10:00
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between items-center mt-3 text-sm text-gray-500">
              <div>
                5 dari 50 data ditampilkan
              </div>
              {/* Pagination */}
              <div className="flex gap-1">
                <button className="w-8 h-8 rounded bg-[#1976D2] text-white font-bold">1</button>
                <button className="w-8 h-8 rounded bg-white border text-[#1976D2]">2</button>
                <button className="w-8 h-8 rounded bg-white border text-[#1976D2]">3</button>
                <button className="w-8 h-8 rounded bg-white border text-[#1976D2]">4</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
