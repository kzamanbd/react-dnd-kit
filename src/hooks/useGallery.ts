// use gallery hooks

import { IGallery } from "../types";

export const useGallery = () => {
    const images: IGallery[] = [
        {
            id: 1,
            alt: "image 1",
            url: "/images/image-1.webp"
        },
        {
            id: 2,
            alt: "image 2",
            url: "/images/image-2.webp"
        },
        {
            id: 3,
            alt: "image 3",
            url: "/images/image-3.webp"
        },
        {
            id: 4,
            alt: "image 4",
            url: "/images/image-4.webp"
        },
        {
            id: 5,
            alt: "image 5",
            url: "/images/image-5.webp"
        },
        {
            id: 6,
            alt: "image 6",
            url: "/images/image-6.webp"
        },
        {
            id: 7,
            alt: "image 7",
            url: "/images/image-7.webp"
        },
        {
            id: 8,
            alt: "image 8",
            url: "/images/image-8.webp"
        },
        {
            id: 9,
            alt: "image 9",
            url: "/images/image-9.webp"
        },
        {
            id: 10,
            alt: "image 10",
            url: "/images/image-10.jpeg"
        },
        {
            id: 11,
            alt: "image 11",
            url: "/images/image-11.jpeg"
        }
    ];

    return {
        images: images
    };
};
