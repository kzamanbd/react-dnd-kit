import { useGallery } from "../hooks/useGallery";
import Image from "./Image";

const Gallery = () => {
    const { images } = useGallery();

    return (
        <div className="grid grid-cols-5 gap-4 max-w-5xl mx-auto my-5 sortable">
            {images.map((image) => (
                <Image key={image.id} image={image} />
            ))}
        </div>
    );
};

export default Gallery;
