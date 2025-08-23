"use client";
import useSWR from 'swr';

const api = process.env.API_URL || 'http://localhost:4000';
const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function DashboardPage() {
  const { data: payments } = useSWR(`${api}/api/payments`, fetcher);
  const { data: customers } = useSWR(`${api}/api/customers`, fetcher);

  return (
    <main className="space-y-8">
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-lg bg-white shadow p-4"><div className="text-gray-500">Payments</div><div className="text-2xl font-bold">{payments?.length ?? '—'}</div></div>
        <div className="rounded-lg bg-white shadow p-4"><div className="text-gray-500">Customers</div><div className="text-2xl font-bold">{customers?.length ?? '—'}</div></div>
        <div className="rounded-lg bg-white shadow p-4"><div className="text-gray-500">Status</div><div className="text-2xl font-bold">OK</div></div>
      </section>

      <section className="rounded-lg bg-white shadow">
        <div className="p-4 border-b font-medium">Recent Payments</div>
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left p-3">ID</th>
              <th className="text-left p-3">Customer</th>
              <th className="text-left p-3">Amount</th>
              <th className="text-left p-3">Currency</th>
              <th className="text-left p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments?.map((p: any) => (
              <tr key={p.id} className="border-t">
                <td className="p-3">{p.id}</td>
                <td className="p-3">{p.customer?.name ?? '—'}</td>
                <td className="p-3">{(p.amount/1000).toLocaleString()}k</td>
                <td className="p-3">{p.currency}</td>
                <td className="p-3"><span className={`px-2 py-1 rounded text-xs ${p.status === 'SUCCESS' ? 'bg-green-100 text-green-700' : p.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'}`}>{p.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}

