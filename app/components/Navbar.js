"use client";
import { useState } from "react";
import { Menu, X, Heart, ShoppingCart, User } from "lucide-react";
import FavoritesCartPopup from "./FavoritesCartPopup"; // Yeni bileşeni import ediyoruz

export default function Navbar({ onFilterClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(null); // Popup için state (favorites veya cart)

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md fixed w-full top-0 z-50">
      <div className="flex items-center space-x-4">
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="p-2 md:hidden"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
        <img src="/path/to/TripkolicLogo.png" alt="Yerel Seyahat Ajansı" className="h-8" />
      </div>

      {/* Desktop Menüsü */}
      <div className="hidden md:flex items-center space-x-4">
        <button 
          onClick={() => onFilterClick("Turlar")} 
          className="text-[#F78410] hover:text-[#E07516] text-base px-2 py-1 rounded"
        >
          Turlar
        </button>
        <button 
          onClick={() => onFilterClick("Biletler")} 
          className="text-[#F78410] hover:text-[#E07516] text-base px-2 py-1 rounded"
        >
          Biletler
        </button>
        <button 
          onClick={() => onFilterClick("Kiralık")} 
          className="text-[#F78410] hover:text-[#E07516] text-base px-2 py-1 rounded"
        >
          Kiralık
        </button>
        <button 
          onClick={() => onFilterClick("Transfer")} 
          className="text-[#F78410] hover:text-[#E07516] text-base px-2 py-1 rounded"
        >
          Transfer
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <Heart 
          size={24} 
          className="text-[#F78410] cursor-pointer hover:text-[#E07516]" 
          onClick={() => setShowPopup("favorites")}
        />
        <ShoppingCart 
          size={24} 
          className="text-[#F78410] cursor-pointer hover:text-[#E07516]" 
          onClick={() => setShowPopup("cart")}
        />
        <User size={24} className="text-[#F78410] cursor-pointer hover:text-[#E07516]" />
      </div>

      {/* Mobil Menü (Popup) */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg p-4 md:hidden max-h-[80vh] overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">Kategoriler</h2>
          <ul className="space-y-4">
            <li>
              <button 
                onClick={() => { onFilterClick("Turlar"); setIsOpen(false); }} 
                className="w-full text-left text-[#F78410] hover:text-[#E07516] text-base truncate"
              >
                Turlar
              </button>
            </li>
            <li>
              <button 
                onClick={() => { onFilterClick("Biletler"); setIsOpen(false); }} 
                className="w-full text-left text-[#F78410] hover:text-[#E07516] text-base truncate"
              >
                Biletler
              </button>
            </li>
            <li>
              <button 
                onClick={() => { onFilterClick("Kiralık"); setIsOpen(false); }} 
                className="w-full text-left text-[#F78410] hover:text-[#E07516] text-base truncate"
              >
                Kiralık
              </button>
            </li>
            <li>
              <button 
                onClick={() => { onFilterClick("Transfer"); setIsOpen(false); }} 
                className="w-full text-left text-[#F78410] hover:text-[#E07516] text-base truncate"
              >
                Transfer
              </button>
            </li>
          </ul>
        </div>
      )}

      {/* Favoriler/Sepet Popup */}
      {showPopup && (
        <FavoritesCartPopup 
          type={showPopup} 
          onClose={() => setShowPopup(null)}
        />
      )}
    </nav>
  );
}