import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/search')({
    validateSearch: (search: Record<string, unknown>): { query: string } => {
        return { query: search.query as string }
    },
    component: SearchPage
});

async function SearchPage() {
    const { query } = Route.useSearch();

    console.log(query);

    const json = await fetch(`http://localhost:3000/api/search?query=${query}`).then(res => res.json()).catch(console.log);

    console.log(json);
}

