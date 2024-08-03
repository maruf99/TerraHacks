import { createRootRoute, Outlet } from '@tanstack/react-router';
import NavBar from '../components/NavBar';

export const Route = createRootRoute({
	component: () => (
		<>
			<div className="flex flex-col min-h-screen">
				<main className="flex-1">
                    <NavBar />
					<Outlet />
				</main>
				<footer className="text-center font-semibold bg-base-200 py-4">© TerraTect 2024. All rights reserved.</footer>
			</div>
		</>
	)
});