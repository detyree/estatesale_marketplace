import React from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, MapPin, Clock, Share2, Heart } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { EstateSale, Item } from '../types';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

export default function SaleDetails() {
  const { id } = useParams();
  const [sale, setSale] = React.useState<EstateSale | null>(null);
  const [items, setItems] = React.useState<Item[]>([]);

  React.useEffect(() => {
    const fetchSaleDetails = async () => {
      if (!id) return;

      const { data: saleData, error: saleError } = await supabase
        .from('estate_sales')
        .select('*')
        .eq('id', id)
        .single();

      if (saleError) {
        toast.error('Failed to load sale details');
        return;
      }

      setSale(saleData);

      const { data: itemsData } = await supabase
        .from('items')
        .select('*')
        .eq('estate_sale_id', id)
        .order('created_at', { ascending: false });

      if (itemsData) {
        setItems(itemsData);
      }
    };

    fetchSaleDetails();
  }, [id]);

  if (!sale) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="relative h-64 md:h-96 rounded-xl overflow-hidden">
        <img
          src={sale.images[0] || "https://images.unsplash.com/photo-1484154218962-a197022b5858"}
          alt={sale.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 space-x-2">
          <button className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100">
            <Share2 className="w-5 h-5 text-gray-600" />
          </button>
          <button className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100">
            <Heart className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-4">{sale.title}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="flex items-center text-gray-600">
            <Calendar className="w-5 h-5 mr-2" />
            <span>{format(new Date(sale.start_date), 'MMM d, yyyy')}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="w-5 h-5 mr-2" />
            <span>{format(new Date(sale.start_date), 'h:mm a')}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="w-5 h-5 mr-2" />
            <span>{sale.address}</span>
          </div>
        </div>

        <p className="text-gray-600 mb-6">{sale.description}</p>

        <h2 className="text-2xl font-semibold mb-4">Items for Sale</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div key={item.id} className="bg-gray-50 rounded-lg p-4">
              <img
                src={item.images[0] || "https://images.unsplash.com/photo-1484154218962-a197022b5858"}
                alt={item.name}
                className="w-full h-48 object-cover rounded-lg mb-3"
              />
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-gray-600">${item.price}</p>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mt-2">
                {item.condition}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}