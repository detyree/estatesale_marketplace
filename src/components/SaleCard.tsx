import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { EstateSale } from '../types';
import { format } from 'date-fns';

interface SaleCardProps {
  sale: EstateSale;
}

export default function SaleCard({ sale }: SaleCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={sale.images[0] || "https://images.unsplash.com/photo-1484154218962-a197022b5858"}
        alt={sale.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{sale.title}</h3>
        <div className="space-y-2 text-gray-600">
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{sale.address}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{format(new Date(sale.start_date), 'MMM d, yyyy')}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            <span>{format(new Date(sale.start_date), 'h:mm a')}</span>
          </div>
        </div>
        <Link
          to={`/sale/${sale.id}`}
          className="mt-4 block text-center bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}