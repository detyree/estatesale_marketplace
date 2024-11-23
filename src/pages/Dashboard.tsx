import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Package } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { supabase } from '../lib/supabase';
import { EstateSale } from '../types';
import SaleCard from '../components/SaleCard';

export default function Dashboard() {
  const [sales, setSales] = React.useState<EstateSale[]>([]);
  const user = useAuthStore((state) => state.user);

  React.useEffect(() => {
    const fetchSales = async () => {
      if (!user) return;
      const { data, error } = await supabase
        .from('estate_sales')
        .select('*')
        .eq('seller_id', user.id)
        .order('created_at', { ascending: false });

      if (!error && data) {
        setSales(data);
      }
    };

    fetchSales();
  }, [user]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Estate Sales</h1>
        <Link
          to="/create-sale"
          className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          <Plus className="w-5 h-5" />
          <span>Create New Sale</span>
        </Link>
      </div>

      {sales.length === 0 ? (
        <div className="text-center py-12">
          <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Sales Yet</h3>
          <p className="text-gray-600 mb-4">Create your first estate sale to get started</p>
          <Link
            to="/create-sale"
            className="inline-flex items-center space-x-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            <Plus className="w-5 h-5" />
            <span>Create Sale</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sales.map((sale) => (
            <SaleCard key={sale.id} sale={sale} />
          ))}
        </div>
      )}
    </div>
  );
}