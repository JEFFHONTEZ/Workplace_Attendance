import { useState, useEffect, useRef } from 'react';
import { Link } from '@inertiajs/react';

type Props = {
    viewUrl?: string;
    editUrl?: string;
    deleteUrl?: string;
    showView?: boolean;
    showEdit?: boolean;
    showDelete?: boolean;
};

export default function KebabMenu({ viewUrl, editUrl, deleteUrl, showView = true, showEdit = true, showDelete = true }: Props) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        function onDoc(e: MouseEvent) {
            if (!ref.current) return;
            if (!ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }

        document.addEventListener('click', onDoc);
        return () => document.removeEventListener('click', onDoc);
    }, []);

    const csrf = typeof document !== 'undefined' ? document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') : '';

    return (
        <div className="relative inline-block text-left" ref={ref}>
            <button type="button" onClick={() => setOpen((s) => !s)} className="px-2 py-1 rounded hover:bg-slate-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
            </button>

            {open && (
                <div className="origin-top-right absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                        {showView && viewUrl && (
                            <Link href={viewUrl} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">View</Link>
                        )}
                        {showEdit && editUrl && (
                            <Link href={editUrl} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Edit</Link>
                        )}
                        {showDelete && deleteUrl && (
                            <form method="post" action={deleteUrl} className="m-0">
                                <input type="hidden" name="_method" value="delete" />
                                {csrf && <input type="hidden" name="_token" value={csrf} />}
                                <button type="submit" className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Delete</button>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
