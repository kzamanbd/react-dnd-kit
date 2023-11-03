/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useDrop } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";
import Dropzone from "react-dropzone";

const ImageGallery = () => {
    const [images, setImages] = useState<any>([]);

    useDrop({
        accept: NativeTypes.FILE,
        drop: (item: any, monitor) => {
            if (monitor) {
                handleDrop(item.files);
            }
        }
    });

    const handleDrop = (droppedFiles: any) => {
        const newImages = [...images];

        for (const file of droppedFiles) {
            const reader = new FileReader();

            reader.onload = (event: any) => {
                newImages.push({
                    id: Date.now(),
                    src: event.target.result,
                    file
                });

                setImages(newImages);
            };

            reader.readAsDataURL(file);
        }
    };

    const handleDelete = (id: any) => {
        const updatedImages = images.filter((image: any) => image.id !== id);
        setImages(updatedImages);
    };

    return (
        <div>
            <Dropzone onDrop={handleDrop} multiple>
                {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()} className="border-dashed border-2">
                        <input {...getInputProps()} />
                        <p>Drag 'n' drop some files here, or click to select files</p>
                    </div>
                )}
            </Dropzone>

            <div className="flex flex-wrap">
                {images.map((image: any) => (
                    <div key={image.id} className="relative m-3">
                        <img src={image.src} alt="Gallery" className="max-w-[150] max-h-[150px]" />
                        <button onClick={() => handleDelete(image.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageGallery;
