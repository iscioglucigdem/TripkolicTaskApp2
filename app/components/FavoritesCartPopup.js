"use client";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function FavoritesCartPopup({ type, onClose }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const storedItems = localStorage.getItem(type === "favorites" ? "favorites" : "cart");
    setItems(storedItems ? JSON.parse(storedItems) : []);
  }, [type]);

  if (items.length === 0) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {type === "favorites" ? "Favoriler" : "Sepet"}
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>
          <p className="text-gray-500">Hiç öğe yok.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {type === "favorites" ? "Favoriler" : "Sepet"}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="border rounded-lg overflow-hidden shadow-md bg-white">
              <img src={item.imageUrl} alt={item.title} className="w-full h-32 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.location}</p>
                <p className="text-gray-700">Fiyat: THB {item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}