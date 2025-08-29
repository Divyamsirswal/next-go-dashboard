'use client';

import { useState } from 'react';
import { createNote } from '@/services/api';
import { PlusCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function NoteForm({ onNoteCreated }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('General');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) {
            setError('Please fill in both title and content.');
            toast.error("Please fill in both title and content.");
            return;
        }
        setIsSubmitting(true);
        setError('');
        try {
            const newNote = { title, content, category };
            await createNote(newNote);
            toast.success("Note created succesfully!");
            setTitle('');
            setContent('');
            setCategory('General');
            onNoteCreated();
        } catch (err) {
            console.error('Failed to create note:', err);
            toast.error("Failed to create note!");
            setError('Failed to create note. Please try again.');

        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-6">
            <h2 className="text-xl font-semibold mb-1">Add New Note</h2>
            <p className="text-sm text-slate-400 mb-5">Fill out the form to add a new note.</p>

            {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

            <div className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-1">Title</label>
                    <input
                        id="title"
                        type="text"
                        placeholder="Enter note title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2.5 rounded-md bg-slate-800 text-white border border-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    />
                </div>
                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-slate-300 mb-1">Content</label>
                    <textarea
                        id="content"
                        placeholder="What's on your mind?"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={4}
                        className="w-full p-2.5 rounded-md bg-slate-800 text-white border border-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-slate-300 mb-1">Category</label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full p-2.5 rounded-md bg-slate-800 text-white border border-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    >
                        <option value="General">General</option>
                        <option value="Work">Work</option>
                        <option value="Personal">Personal</option>
                        <option value="Ideas">Ideas</option>
                    </select>
                </div>
            </div>
            <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-4 rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <PlusCircle size={18} />
                {isSubmitting ? 'Adding...' : 'Add Note'}
            </button>
        </form>
    );
}
