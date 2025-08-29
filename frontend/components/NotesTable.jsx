'use client';

import { FileWarning, Inbox } from 'lucide-react';

const CategoryBadge = ({ category }) => {
    const colors = {
        'Work': 'bg-blue-900/50 text-blue-300 border-blue-500/30',
        'Personal': 'bg-emerald-900/50 text-emerald-300 border-emerald-500/30',
        'Ideas': 'bg-amber-900/50 text-amber-300 border-amber-500/30',
        'General': 'bg-slate-700/50 text-slate-300 border-slate-500/30',
    };
    return (
        <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full border ${colors[category] || colors['General']}`}>
            {category}
        </span>
    );
};

const SkeletonRow = () => (
    <tr className="animate-pulse">
        <td className="px-6 py-4"><div className="h-4 bg-slate-700 rounded w-3/4"></div></td>
        <td className="px-6 py-4"><div className="h-4 bg-slate-700 rounded w-1/2"></div></td>
        <td className="px-6 py-4"><div className="h-4 bg-slate-700 rounded w-full"></div></td>
        <td className="px-6 py-4"><div className="h-4 bg-slate-700 rounded w-2/3"></div></td>
    </tr>
);

const EmptyState = () => (
    <div className="text-center py-16 px-6">
        <Inbox className="mx-auto h-12 w-12 text-slate-500" />
        <h3 className="mt-2 text-lg font-semibold text-slate-300">No Notes Found</h3>
        <p className="mt-1 text-sm text-slate-400">Get started by adding a new note using the form.</p>
    </div>
);

const ErrorState = ({ message }) => (
    <div className="text-center py-16 px-6">
        <FileWarning className="mx-auto h-12 w-12 text-red-400" />
        <h3 className="mt-2 text-lg font-semibold text-red-300">An Error Occurred</h3>
        <p className="mt-1 text-sm text-slate-400">{message}</p>
    </div>
);

export default function NotesTable({ notes, isLoading, error }) {
    if (error) {
        return <ErrorState message={error} />;
    }

    if (!isLoading && (!notes || notes.length === 0)) {
        return <EmptyState />;
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-slate-300">
                <thead className="text-xs text-slate-400 uppercase bg-slate-900">
                    <tr>
                        <th scope="col" className="px-6 py-3 font-medium">Title</th>
                        <th scope="col" className="px-6 py-3 font-medium">Category</th>
                        <th scope="col" className="px-6 py-3 font-medium">Content</th>
                        <th scope="col" className="px-6 py-3 font-medium">Created At</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                    {isLoading ? (
                        [...Array(5)].map((_, i) => <SkeletonRow key={i} />)
                    ) : (
                        notes.map((note) => (
                            <tr key={note.ID} className="hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4 font-medium text-slate-100 whitespace-nowrap">{note.title}</td>
                                <td className="px-6 py-4"><CategoryBadge category={note.category} /></td>
                                <td className="px-6 py-4 max-w-sm truncate">{note.content}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{new Date(note.CreatedAt).toLocaleString()}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}