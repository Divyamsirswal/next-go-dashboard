'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PieChart } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

export default function NotesChart({ notes, isLoading }) {
    const data = notes.reduce((acc, note) => {
        const category = note.category || 'Uncategorized';
        const existingCategory = acc.find(item => item.name === category);
        if (existingCategory) {
            existingCategory.count += 1;
        } else {
            acc.push({ name: category, count: 1 });
        }
        return acc;
    }, []);

    return (
        <div className="p-6 h-96">
            <div className="flex items-center gap-2 mb-4">
                <PieChart className="text-indigo-400" size={20} />
                <h2 className="text-xl font-semibold">Notes by Category</h2>
            </div>
            <div className="h-[calc(100%-2rem)]">
                {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                        <LoadingSpinner />
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} margin={{ top: 5, right: 20, left: -15, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                            <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis allowDecals={false} stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip
                                cursor={{ fill: 'rgba(129, 140, 248, 0.1)' }}
                                contentStyle={{
                                    backgroundColor: '#1e293b',
                                    border: '1px solid #334155',
                                    borderRadius: '0.5rem',
                                    color: '#e2e8f0'
                                }}
                            />
                            <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
}
