"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { Suspense } from "react";

// TourDetail içeriğini taşıyan bileşen
function TourDetailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tourId = searchParams.get("id");

  const [tour, setTour] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);

  const tours = [
    { id: 1, title: "Phi Phi, Khai Adaları Hızlı Tekne ile Tam Gün Tur", price: 1400, discount: 30, rating: 4.3, imageUrl: "/path/to/phi-phi-islands.png", location: "Rassada Pier/Rassada...", theme: "Ada Turu", activity: "Yüzme", startTime: "09:00", groupSize: 20, vehicle: "Hızlı Tekne", category: "Turlar" },
    { id: 2, title: "James Bond Adası Turu", price: 1200, rating: 4.5, imageUrl: "/path/to/TekneTuru.png", location: "Phuket Town/Phuket...", theme: "Kara Turu", activity: "Koşu", startTime: "12:00", groupSize: 15, vehicle: "Yat", category: "Turlar" },
    { id: 3, title: "Safari Macera Turu", price: 1800, rating: 4.0, imageUrl: "/path/to/safari.png", location: "Chalong Tapınağı/Chalong...", theme: "Safari", activity: "Fil Bakımı", startTime: "15:00", groupSize: 25, vehicle: "Safari", category: "Turlar" },
  ];

  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    setFavorites(savedFavorites ? JSON.parse(savedFavorites) : []);

    const savedCart = localStorage.getItem("cart");
    setCart(savedCart ? JSON.parse(savedCart) : []);
  }, []);

  useEffect(() => {
    if (tourId && !isNaN(parseInt(tourId))) {
      const selectedTour = tours.find((t) => t.id === parseInt(tourId));
      setTour(selectedTour || null);
    } else {
      setTour(null);
    }
  }, [tourId]);

  if (!tour) return <div>Yükleniyor...</div>;

  const handleAddToFavorites = () => {
    if (!favorites.some((fav) => fav.id === tour.id)) {
      const newFavorites = [...favorites, tour];
      setFavorites(newFavorites);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      alert(`${tour.title} favorilere eklendi!`);
    } else {
      alert("Bu tur zaten favorilerde!");
    }
  };

  const handleAddToCart = () => {
    if (!cart.some((item) => item.id === tour.id)) {
      const newCart = [...cart, tour];
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
      alert(`${tour.title} sepete eklendi!`);
    } else {
      alert("Bu tur zaten sepette!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <button
        onClick={() => router.back()}
        className="mb-4 bg-[#F78410] text-white px-4 py-2 rounded-lg hover:bg-[#E07516]"
      >
        Geri Dön
      </button>
      <div className="border rounded-lg overflow-hidden shadow-md bg-white">
        <img src={tour.imageUrl} alt={tour.title} className="w-full h-48 object-cover" />
        <div className="p-4">
          {tour.discount && <p className="text-red-500 text-sm">{tour.discount}% İNDİRİM</p>}
          <h3 className="text-lg font-semibold text-gray-800">{tour.title}</h3>
          <p className="text-gray-500 text-sm">{tour.location}</p>
          <p className="text-gray-700">Fiyat: THB {tour.price}</p>
          <p className="text-yellow-500 text-sm">⭐ {tour.rating} (20)</p>
          <p className="mt-2 text-gray-600">Açıklama: Bu tur, eşsiz manzaralar ve unutulmaz deneyimler sunar. Doğal güzelliklerin keyfini çıkarın ve macera dolu bir gün geçirin!</p>
          <div className="mt-4 flex space-x-4">
            <button
              onClick={handleAddToFavorites}
              className="flex items-center bg-[#F78410] text-white px-4 py-2 rounded-lg hover:bg-[#E07516]"
            >
              <Heart size={18} className="mr-2" /> Favorilere Ekle
            </button>
            <button
              onClick={handleAddToCart}
              className="flex items-center bg-[#F78410] text-white px-4 py-2 rounded-lg hover:bg-[#E07516]"
            >
              <ShoppingCart size={18} className="mr-2" /> Sepete Ekle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Suspense ile sarılmış ana bileşen
export default function TourDetail() {
  return (
    <Suspense fallback={<div>Yükleniyor...</div>}>
      <TourDetailContent />
    </Suspense>
  );
}