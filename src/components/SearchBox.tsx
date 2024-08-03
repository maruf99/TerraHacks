import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

export default function SearchBox() {
	return (
		<label className="input input-bordered flex items-center gap-2">
            <MagnifyingGlassIcon className="h-4 w-4 opacity-70"/>
			<input type="text" className="grow" placeholder="Search" />
		</label>
	);
}
