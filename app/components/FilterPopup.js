"use client";
import { useState } from "react";
import { X } from "lucide-react";

export default function FilterPopup({ category, onClose, onApplyFilters }) {
  const [filters, setFilters] = useState({
    location: "",
    theme: "Kara Turu",
    activity: "Yüzme",
    price: 12500,
    startTime: "09:00",
    groupSize: 20,
    vehicle: "Hızlı Tekne",
    features: ["Transfer", "Helal Yemek"],
    date: "Bugün",
    vehicleType: "Motorsiklet",
    duration: 7,
    priceRange: 1500,
  });

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const filterOptions = {
    Turlar: [
      { label: "Konum", type: "input", value: filters.location, onChange: (e) => handleFilterChange("location", e.target.value) },
      { label: "Tema", type: "select", options: ["Kara Turu", "Ada Turu", "Safari"], value: filters.theme, onChange: (e) => handleFilterChange("theme", e.target.value) },
      { label: "Aktivite", type: "select", options: ["Yüzme", "Koşu", "Fil Bakımı", "Dalış"], value: filters.activity, onChange: (e) => handleFilterChange("activity", e.target.value) },
      { label: "Fiyat", type: "range", min: 0, max: 20000, value: filters.price, onChange: (e) => handleFilterChange("price", parseInt(e.target.value)) },
      { label: "Başlangıç Saati", type: "select", options: ["09:00", "12:00", "15:00", "17:00"], value: filters.startTime, onChange: (e) => handleFilterChange("startTime", e.target.value) },
      { label: "Grup Büyüklüğü", type: "range", min: 1, max: 40, value: filters.groupSize, onChange: (e) => handleFilterChange("groupSize", parseInt(e.target.value)) },
      { label: "Araç", type: "select", options: ["Yat", "Hızlı Tekne", "Safari", "Katamaran", "Hızlı Katamaran"], value: filters.vehicle, onChange: (e) => handleFilterChange("vehicle", e.target.value) },
      { label: "Özellikler", type: "checkbox", options: ["Transfer", "Helal Yemek", "Vejetaryen Yemek"], value: filters.features, onChange: (option) => handleFilterChange("features", filters.features.includes(option) ? filters.features.filter((f) => f !== option) : [...filters.features, option]) },
    ],
    Biletler: [
      { label: "Konum", type: "input", value: filters.location, onChange: (e) => handleFilterChange("location", e.target.value) },
      { label: "Fiyat", type: "range", min: 0, max: 2000, value: filters.price, onChange: (e) => handleFilterChange("price", parseInt(e.target.value)) },
      { label: "Tarih", type: "select", options: ["Bugün", "Yarın", "Gelecek Hafta"], value: filters.date, onChange: (e) => handleFilterChange("date", e.target.value) },
    ],
    Kiralık: [
      { label: "Konum", type: "input", value: filters.location, onChange: (e) => handleFilterChange("location", e.target.value) },
      { label: "Araç Türü", type: "select", options: ["Araba", "Motorsiklet", "Scooter"], value: filters.vehicleType, onChange: (e) => handleFilterChange("vehicleType", e.target.value) },
      { label: "Süre", type: "range", min: 1, max: 30, value: filters.duration, onChange: (e) => handleFilterChange("duration", parseInt(e.target.value)) },
    ],
    Transfer: [
      { label: "Konum", type: "input", value: filters.location, onChange: (e) => handleFilterChange("location", e.target.value) },
      { label: "Araç", type: "select", options: ["Van", "Otobüs", "Taksi"], value: filters.vehicle, onChange: (e) => handleFilterChange("vehicle", e.target.value) },
      { label: "Fiyat", type: "range", min: 0, max: 5000, value: filters.priceRange, onChange: (e) => handleFilterChange("priceRange", parseInt(e.target.value)) },
    ],
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{category} için Filtreler</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4 max-h-[70vh] overflow-y-auto">
          {filterOptions[category]?.map((filter, index) => (
            <div key={index} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">{filter.label}</label>
              {filter.type === "input" && (
                <input
                  type="text"
                  value={filter.value}
                  onChange={filter.onChange}
                  className="w-full p-2 border rounded-lg"
                />
              )}
              {filter.type === "select" && (
                <select
                  value={filter.value}
                  onChange={filter.onChange}
                  className="w-full p-2 border rounded-lg"
                >
                  {filter.options.map((option, i) => (
                    <option key={i} value={option}>{option}</option>
                  ))}
                </select>
              )}
              {filter.type === "range" && (
                <input
                  type="range"
                  min={filter.min}
                  max={filter.max}
                  value={filter.value}
                  onChange={filter.onChange}
                  className="w-full"
                />
              )}
              {filter.type === "checkbox" && (
                <div className="space-y-2">
                  {filter.options.map((option, i) => (
                    <label key={i} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={filter.value.includes(option)}
                        onChange={() => filter.onChange(option)}
                        className="h-4 w-4 text-[#F78410] border-gray-300 rounded"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-between">
          <button
            onClick={() => { setFilters({}); onClose(); }}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Sıfırla
          </button>
          <button
            onClick={() => onApplyFilters(filters)}
            className="px-4 py-2 bg-[#F78410] text-white rounded-lg hover:bg-[#E07516]"
          >
            Ara
          </button>
        </div>
      </div>
    </div>
  );
}