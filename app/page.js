"use client";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import FilterPopup from "./components/FilterPopup";
import TourCard from "./components/TourCard";

export default function Home() {
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Turlar");
  const [filters, setFilters] = useState({});
  const [tours, setTours] = useState([
    { id: 1, title: "Phi Phi, Khai Adaları Hızlı Tekne ile Tam Gün Tur", price: 1400, discount: 30, rating: 4.3, imageUrl: "/path/to/TekneTuru2.png", location: "Rassada Pier/Rassada...", theme: "Ada Turu", activity: "Yüzme", startTime: "09:00", groupSize: 20, vehicle: "Hızlı Tekne", category: "Turlar" },
    { id: 2, title: "James Bond Adası Turu", price: 1200, rating: 4.5, imageUrl: "/path/to/tekneTuru.png", location: "Phuket Town/Phuket...", theme: "Kara Turu", activity: "Koşu", startTime: "12:00", groupSize: 15, vehicle: "Yat", category: "Turlar" },
    { id: 3, title: "Safari Macera Turu", price: 1800, rating: 4.0, imageUrl: "/path/to/safari.png", location: "Chalong Tapınağı/Chalong...", theme: "Safari", activity: "Fil Bakımı", startTime: "15:00", groupSize: 25, vehicle: "Safari", category: "Turlar" },
    { id: 4, title: "Phuket Hayvanat Bahçesi Biletleri", price: 800, rating: 4.2, imageUrl: "/path/to/Zoo.png", location: "Phuket Hayvanat Bahçesi/Phuket...", date: "Bugün", priceRange: 1000, category: "Biletler" },
    { id: 5, title: "Phuket’te Scooter Kiralama", price: 500, rating: 4.1, imageUrl: "/path/to/Scooter.png", location: "Patong Plajı/Patong...", vehicleType: "Scooter", duration: 7, category: "Kiralık" },
    { id: 6, title: "Havalimanı Transfer Hizmeti", price: 1200, rating: 4.4, imageUrl: "/path/to/Havalimanı.png", location: "Phuket Havalimanı/Phuket...", vehicle: "Van", priceRange: 1500, category: "Transfer" },
    { id: 7, title: "Similan Adaları Tekne Turu", price: 1600, discount: 20, rating: 4.6, imageUrl: "/path/to/tekneTuru.png", location: "Khao Lak/Khao Lak...", theme: "Ada Turu", activity: "Dalış", startTime: "08:00", groupSize: 18, vehicle: "Hızlı Tekne", category: "Turlar" },
    { id: 8, title: "Phuket Akvaryum Biletleri", price: 600, rating: 4.0, imageUrl: "/path/to/AdaTuru.png", location: "Phuket Akvaryum/Phuket...", date: "Yarın", priceRange: 800, category: "Biletler" },
    { id: 9, title: "Araba Kiralama Phuket", price: 1000, rating: 4.3, imageUrl: "/path/to/ArabaTuru.png", location: "Phuket Merkez/Phuket...", vehicleType: "Araba", duration: 5, category: "Kiralık" },
    { id: 10, title: "Otel Transfer Servisi", price: 900, rating: 4.5, imageUrl: "/path/to/OtelTuru.png", location: "Phuket Otelleri/Phuket...", vehicle: "Otobüs", priceRange: 1200, category: "Transfer" },
  ]);

  const filteredTours = tours.filter((tour) => {
    if (selectedCategory !== tour.category) return false;
    
    return (
      (!filters.location || tour.location.toLowerCase().includes(filters.location.toLowerCase())) &&
      (!filters.theme || (tour.theme && tour.theme === filters.theme)) &&
      (!filters.activity || (tour.activity && tour.activity === filters.activity)) &&
      (!filters.price || (tour.price && tour.price <= filters.price)) &&
      (!filters.startTime || (tour.startTime && tour.startTime === filters.startTime)) &&
      (!filters.groupSize || (tour.groupSize && tour.groupSize <= filters.groupSize)) &&
      (!filters.vehicle || (tour.vehicle && tour.vehicle === filters.vehicle)) &&
      (!filters.date || (tour.date && tour.date === filters.date)) &&
      (!filters.vehicleType || (tour.vehicleType && tour.vehicleType === filters.vehicleType)) &&
      (!filters.duration || (tour.duration && tour.duration <= filters.duration)) &&
      (!filters.priceRange || (tour.priceRange && tour.priceRange <= filters.priceRange))
    );
  });

  return (
    <div className="min-h-screen bg-gray-100 relative">
      <Navbar onFilterClick={(category) => { setSelectedCategory(category); setShowFilter(true); }} />
      
      {showFilter && (
        <FilterPopup 
          category={selectedCategory} 
          onClose={() => setShowFilter(false)} 
          onApplyFilters={(newFilters) => { setFilters(newFilters); setShowFilter(false); }}
        />
      )}

      <main className="pt-16 p-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTours.length > 0 ? (
              filteredTours.map((tour) => (
                <TourCard 
                  key={tour.id}
                  title={tour.title}
                  price={tour.price}
                  discount={tour.discount}
                  rating={tour.rating}
                  imageUrl={tour.imageUrl}
                  location={tour.location}
                  id={tour.id} // ID prop’unu ekledik, emin olmak için
                />
              ))
            ) : (
              <p className="text-gray-500 text-center col-span-full">Hiç sonuç bulunamadı. Lütfen filtreleri yeniden ayarlayın.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}