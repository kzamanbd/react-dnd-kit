import { IGallery } from "../types";

type ImageProps = {
    image: IGallery;
};

const Image: React.FC<ImageProps> = ({ image }) => {
    return (
        <div key={image.id} className="item">
            <img className="gallery-img" src={image.url} alt={image.alt} />
        </div>
    );
};

export default Image;
