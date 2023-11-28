import {
    DndContext,
    DragEndEvent,
    DragOverlay,
    DragStartEvent,
    MouseSensor,
    TouchSensor,
    closestCenter,
    useSensor,
    useSensors
} from '@dnd-kit/core';

import { SortableContext, arrayMove, rectSortingStrategy } from '@dnd-kit/sortable';
import { FC, useCallback, useMemo, useState } from 'react';
import Dropzone from 'react-dropzone';
import { useGallery } from '../hooks/useGallery';
import { IGallery } from '../types';
import Card from './Card';
import SortableCard from './SortableCard';

const DraggableList: FC = () => {
    const { images } = useGallery();
    const [items, setItems] = useState(images);
    const [activeCard, setActiveCard] = useState<IGallery | null>();

    // setup sensors
    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: {
                distance: 10
            }
        }),
        useSensor(TouchSensor)
    );

    // drag start handler when user starts dragging
    const handleDragStart = useCallback(
        (event: DragStartEvent) => {
            setActiveCard(items.find((image) => image.id === event.active.id) || null);
        },
        [items]
    );

    // drag end handler when user stops dragging
    const handleDragEnd = useCallback((event: DragEndEvent) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            setItems((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over!.id);

                return arrayMove(items, oldIndex, newIndex);
            });
        }

        setActiveCard(null);
    }, []);

    // drag cancel handler when user cancels dragging
    const handleDragCancel = useCallback(() => {
        setActiveCard(undefined);
    }, []);

    // file selection handler
    const itemClickHandler = (id: string) => {
        setItems((items) => {
            return items.map((item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        checked: !item.checked
                    };
                }
                return item;
            });
        });
    };

    // delete selected files
    const deleteSelectedFiles = () => {
        setItems((items) => items.filter((item) => !item.checked));
    };
    // count selected item
    const selectedItems = items.filter((item) => item.checked).length;

    // title of the card
    const cardTitle = selectedItems > 0 ? `${selectedItems} File${selectedItems > 1 ? 's' : ''} Selected` : 'Gallery';

    // unique ids of the items
    const itemIds = useMemo(() => items.map((item) => item.id), [items]);

    // upload new image
    const handleDrop = (droppedFiles: File[]) => {
        const newImages = [...items];

        for (const file of droppedFiles) {
            const reader = new FileReader();
            reader.onload = (event) => {
                newImages.push({
                    id: Date.now() + '',
                    src: event.target!.result as string,
                    alt: 'New Image'
                });
                setItems(newImages);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="card border my-5">
            <h2 className="card-header flex justify-between">
                <span className="text-2xl font-bold ">{cardTitle}</span>
                {selectedItems > 0 && (
                    <button className="text-red-500 text-xl" onClick={deleteSelectedFiles}>
                        Delete File{selectedItems > 1 ? 's' : ''}
                    </button>
                )}
            </h2>
            <div className="card-body">
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    onDragCancel={handleDragCancel}>
                    <SortableContext items={itemIds} strategy={rectSortingStrategy}>
                        <div className="grid gap-3 lg:grid-cols-5 md:grid-cols-3 grid-cols-2">
                            {items.map(({ src, alt, checked, id }, index) => (
                                <SortableCard
                                    key={index}
                                    index={index}
                                    id={id}
                                    src={src}
                                    alt={alt}
                                    itemClickHandler={itemClickHandler}
                                    checked={Boolean(checked)}
                                />
                            ))}
                            <div className="card-item border-2 border-gray-300 border-dashed bg-gray-50 hover:bg-gray-100 lg:col-span-1 md:col-span-1 col-span-2">
                                <Dropzone
                                    onDrop={handleDrop}
                                    multiple
                                    accept={{
                                        'image/jpeg': [],
                                        'image/png': [],
                                        'image/gif': []
                                    }}>
                                    {({ getRootProps, getInputProps }) => (
                                        <div
                                            {...getRootProps()}
                                            className="flex items-center justify-center h-full w-full cursor-pointer">
                                            <input {...getInputProps()} />
                                            <div className="flex flex-col items-center justify-center">
                                                <svg
                                                    className="w-8 h-8 mb-4 text-gray-500 "
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 20 16">
                                                    <path
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                                    />
                                                </svg>
                                                <p className="mb-2 text-sm text-gray-500 ">
                                                    <span className="font-semibold">Add Image</span>
                                                </p>
                                                <p className="text-xs text-gray-500 flex justify-center">
                                                    PNG, JPG or GIF (1:1)
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </Dropzone>
                            </div>
                        </div>
                    </SortableContext>
                    <DragOverlay adjustScale>
                        {activeCard ? (
                            <Card src={activeCard.src} alt={activeCard.alt} id={activeCard.id} isDragging />
                        ) : null}
                    </DragOverlay>
                </DndContext>
            </div>
        </div>
    );
};

export default DraggableList;
