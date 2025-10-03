"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-lg font-semibold text-gray-900 hover:text-gray-700">
            Home
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm text-gray-700">
          <a href="#about" className="hover:text-gray-900">About</a>
          <a href="#services" className="hover:text-gray-900">Services</a>
          <a href="#testimonials" className="hover:text-gray-900">Testimonials</a>
          <a href="#gallery" className="hover:text-gray-900">Gallery</a>
          <a href="#faq" className="hover:text-gray-900">FAQ</a>
          <a href="#contact" className="hover:text-gray-900">Contact</a>
        </div>
        <div className="md:hidden">
          {/* Placeholder for mobile menu button if needed later */}
        </div>
      </nav>
    </header>
  );
}
