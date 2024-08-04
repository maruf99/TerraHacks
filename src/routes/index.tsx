import { createFileRoute } from '@tanstack/react-router';
import logo from "../assets/logo-transparent.png";
import SearchBox from '../components/SearchBox';

export const Route = createFileRoute('/')({
  component: HomePage
});

function HomePage() {
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('image', e.currentTarget.image.files[0]);
        formData.append('text', e.currentTarget.query.value);

        await fetch('http://localhost:3000/api/search', {
            method: 'POST',
            body: formData
        });
    }

    return (
        <div className="w-full flex flex-col items-center justify-center text-center my-4 gap-y-4">
            <div className="container space-y-4 px-4">
                <div className="flex w-full items-center justify-center">
                    <img src={logo} className="w-48 h-48" />
                </div>
				<h1 className="text-7xl font-bold">
					Welcome to TerraTect!
				</h1>
				<h2 className="text-lg font-semibold">
					We're a website dedicated to bringing awareness to local endangered animal species. We hope that by providing accurate statistics and data, as well as resources to contribute to the conservation of these animals, we can help our users contribute to their conservation!

                    Feel free to begin by searching for a species below, or explore different species through our extensive categories!
				</h2>
                <SearchBox/>
			</div>
        </div>
    );
}