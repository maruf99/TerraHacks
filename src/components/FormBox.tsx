import SearchBox from './SearchBox';

export default function FormBox() {
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('query', e.currentTarget.query.value);
        if (e.currentTarget.image.files?.length) {
            formData.append('image', e.currentTarget.image.files[0]);
        }

        await fetch('http://localhost:3000/api/search', {
            method: 'POST',
            body: formData
        });
    };

	return (
		<form onSubmit={handleSubmit}>
			<div className="flex flex-col gap-3 justify-center items-center">
				<SearchBox handleKey={false}/>
				<input name="image" type="file" className="file-input file-input-bordered file-input-primary w-full max-w-xs" />
				<input type="submit" className="btn btn-primary" />
			</div>
		</form>
	);
}
