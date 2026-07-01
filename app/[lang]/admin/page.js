import { prisma } from '@/app/lib/prisma';

// Revalidate this page every 10 seconds to fetch new leads
export const revalidate = 10;

export default async function AdminDashboard() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="min-h-screen bg-luxury-navy text-luxury-white p-12 pt-32">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-outfit text-luxury-gold">CRM Dashboard</h1>
          <div className="bg-luxury-gray px-4 py-2 rounded-lg text-sm">
            Total Leads: {leads.length}
          </div>
        </div>

        <div className="overflow-x-auto bg-[#131F33] border border-white/10 rounded-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/5 text-sm uppercase tracking-wider text-gray-400">
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Name</th>
                <th className="p-4 font-medium">Phone</th>
                <th className="p-4 font-medium">Email</th>
                <th className="p-4 font-medium">Project</th>
                <th className="p-4 font-medium">Source</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {leads.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-400">
                    No leads captured yet.
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4 text-gray-400">
                      {new Date(lead.createdAt).toLocaleString()}
                    </td>
                    <td className="p-4 font-medium">{lead.name}</td>
                    <td className="p-4">{lead.phone}</td>
                    <td className="p-4 text-gray-400">{lead.email || '-'}</td>
                    <td className="p-4 text-luxury-gold">{lead.project}</td>
                    <td className="p-4 text-gray-400">{lead.source}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
