import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="text-center py-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Discover Amazing Estate Sales
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90">
          Find unique treasures and amazing deals in your area
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/auth"
            className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition"
          >
            Start Selling
          </Link>
          <button className="bg-transparent border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition">
            Browse Sales
          </button>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Example Estate Sale Card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1484154218962-a197022b5858"
            alt="Estate Sale"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">Vintage Collection Sale</h3>
            <div className="space-y-2 text-gray-600">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                <span>123 Main St, Anytown, USA</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>March 15-16, 2024</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>9:00 AM - 4:00 PM</span>
              </div>
            </div>
            <Link
              to="/sale/1"
              className="mt-4 block text-center bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              View Details
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}