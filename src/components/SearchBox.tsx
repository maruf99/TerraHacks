import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';

export default function SearchBox() {
    const navigate = useNavigate();

    const [query, setQuery] = useState('');

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        e.preventDefault();
        setQuery(e.target.value);
    }

    const handleEnter = (e: React.KeyboardEvent<HTMLElement>) => {
        if (e.key === "Enter") {
            if (!query.length) return;
            navigate({ to: `/search`, search: { q: encodeURIComponent(query) } });
        }
    }

	return (
		<label className="input input-bordered flex items-center gap-2">
            <MagnifyingGlassIcon className="h-4 w-4 opacity-70"/>
			<input name="query" type="text" className="grow" placeholder="Search" onChange={handleChange} onKeyUp={handleEnter}/>
		</label>
	);
}
