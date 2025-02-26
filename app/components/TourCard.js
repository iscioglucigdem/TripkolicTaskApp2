"use client";
import { useState, useEffect } from "react"; // Add useEffect
import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";

export default function TourCard({ title, price, discount, rating, imageUrl, location, id }) {
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);

  // Load favorites and cart from localStorage after mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    setFavorites(savedFavorites ? JSON.parse(savedFavorites) : []);

    const savedCart = localStorage.getItem("cart");
    setCart(savedCart ? JSON.parse(savedCart) : []);
  }, []);

  const handleAddToFavorites = () => {
    const fullTour = { id, title, price, discount, rating, imageUrl, location };
    if (!favorites.some((fav) => fav.id === id)) {
      const newFavorites = [...favorites, fullTour];
      setFavorites(newFavorites);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      alert(`${title} favorilere eklendi!`);
    } else {
      alert("Bu tur zaten favorilerde!");
    }
  };

  const handleAddToCart = () => {
    const fullTour = { id, title, price, discount, rating, imageUrl, location };
    if (!cart.some((item) => item.id === id)) {
      const newCart = [...cart, fullTour];
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
      alert(`${title} sepete eklendi!`);
    } else {
      alert("Bu tur zaten sepette!");
    }
  };

  return (
    <Link href={`/tour-detail?id=${id}`} className="block">
      <div className="border rounded-lg overflow-hidden shadow-md mb-4 bg-white hover:shadow-lg transition-shadow cursor-pointer">
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
        <div className="p-4">
          {discount && <p className="text-red-500 text-sm">{discount}% İNDİRİM</p>}
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <p className="text-gray-500 text-sm">{location}</p>
          <p className="text-gray-700">Fiyat: THB {price}</p>
          <p className="text-yellow-500 text-sm">⭐ {rating} (20)</p>
          <div className="mt-4 flex space-x-4">
            <button
              onClick={(e) => { e.preventDefault(); handleAddToFavorites(); }}
              className="flex items-center bg-[#F78410] text-white px-4 py-2 rounded-lg hover:bg-[#E07516]"
            >
              <Heart size={18} className="mr-2" /> Favorilere Ekle
            </button>
            <button
              onClick={(e) => { e.preventDefault(); handleAddToCart(); }}
              className="flex items-center bg-[#F78410] text-white px-4 py-2 rounded-lg hover:bg-[#E07516]"
            >
              <ShoppingCart size={18} className="mr-2" /> Sepete Ekle
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}//