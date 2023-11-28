// use gallery hooks

import { IGallery } from '../types';

export const useGallery = () => {
    const images: IGallery[] = [
        {
            id: '1',
            alt: 'image 1',
            src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg'
        },
        {
            id: '2',
            alt: 'image 2',
            src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg'
        },
        {
            id: '3',
            alt: 'image 3',
            src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg'
        },
        {
            id: '4',
            alt: 'image 4',
            src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg'
        },
        {
            id: '5',
            alt: 'image 5',
            src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg'
        },
        {
            id: '6',
            alt: 'image 6',
            src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg'
        },
        {
            id: '7',
            alt: 'image 7',
            src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg'
        },
        {
            id: '8',
            alt: 'image 8',
            src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg'
        },
        {
            id: '9',
            alt: 'image 9',
            src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg'
        },
        {
            id: '10',
            alt: 'image 10',
            src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg'
        },
        {
            id: '11',
            alt: 'image 11',
            src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg'
        }
    ];

    return {
        images: images
    };
};
