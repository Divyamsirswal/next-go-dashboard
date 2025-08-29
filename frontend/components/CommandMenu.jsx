'use client';

import { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { FilePlus, Notebook, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CommandMenu({ notes = [], onAddNote }) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const down = (e) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((current) => !current);
            }
        };
        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    const runCommand = (command) => {
        if (command) command();
        setOpen(false);
    };

    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="fixed inset-0 bg-slate-950/50 backdrop-blur-lg"
                        onClick={() => setOpen(false)}
                    ></motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.97 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        className="relative z-10 w-[95vw] max-w-2xl overflow-hidden rounded-xl bg-slate-900/80 shadow-2xl border border-slate-700/60"
                    >
                        <Command
                            className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-slate-400 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-input]]:px-2 [&_[cmdk-input]]:bg-transparent [&_[cmdk-input]]:text-slate-50 [&_[cmdk-input]]:border-0 [&_[cmdk-input]]:outline-none [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-2 [&_[cmdk-item]]:rounded-md [&_[cmdk-item]]:cursor-pointer [&_[cmdk-item]]:select-none [&_[cmdk-item]]:flex [&_[cmdk-item]]:items-center [&_[cmdk-item]]:justify-between [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5 [&_[cmdk-item][data-selected=true]]:bg-slate-800"
                        >
                            <div className="flex items-center border-b border-slate-800 px-3" cmdk-input-wrapper="">
                                <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                                <Command.Input
                                    placeholder="Type a command or search..."
                                    className="w-full placeholder:text-slate-500"
                                />
                            </div>

                            <Command.List className="p-2 max-h-[400px] overflow-y-auto overflow-x-hidden">
                                <Command.Empty>No results found.</Command.Empty>

                                <Command.Group heading="Actions">
                                    <Command.Item
                                        onSelect={() => runCommand(onAddNote)}
                                        className="group"
                                    >
                                        <div className="flex items-center gap-2">
                                            <FilePlus className="text-slate-500" />
                                            <span>Add New Note</span>
                                        </div>
                                    </Command.Item>
                                </Command.Group>

                                <Command.Group heading="Notes">
                                    {notes.map((note) => (
                                        <Command.Item
                                            key={note.ID}
                                            value={note.title + ' ' + note.category}
                                            onSelect={() => {
                                                console.log(`Selected note: ${note.title}`);
                                                setOpen(false);
                                            }}
                                        >
                                            <div className="flex items-center gap-2">
                                                <Notebook className="text-slate-500" />
                                                <span>{note.title}</span>
                                            </div>
                                            <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full">
                                                {note.category}
                                            </span>
                                        </Command.Item>
                                    ))}
                                </Command.Group>
                            </Command.List>

                            <div className="flex items-center justify-end gap-4 p-2 text-xs text-slate-500 border-t border-slate-800">
                                <span>Navigate: <kbd className="font-sans rounded bg-slate-700/80 px-1.5 py-0.5">↑</kbd> <kbd className="font-sans rounded bg-slate-700/80 px-1.5 py-0.5">↓</kbd></span>
                                <span>Select: <kbd className="font-sans rounded bg-slate-700/80 px-1.5 py-0.5">↵</kbd></span>
                            </div>
                        </Command>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}