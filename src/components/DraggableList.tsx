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
} from "@dnd-kit/core";

import { SortableContext, arrayMove, rectSortingStrategy } from "@dnd-kit/sortable";
import { FC, useState } from "react";
import { useGallery } from "../hooks/useGallery";
import { IGallery } from "../types";
import Card from "./Card";
import Grid from "./Grid";
import SortableCard from "./SortableCard";

const DraggableList: FC = () => {
    const { images } = useGallery();
    const [items, setItems] = useState(images);
    const [activeCard, setActiveCard] = useState<IGallery | null>(null);

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
    const handleDragStart = (event: DragStartEvent) => {
        setActiveCard(items.find((image) => image.id === Number(event.active.id)) || null);
    };

    // drag end handler when user stops dragging
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            setItems((items) => {
                const oldIndex = items.findIndex((item) => item.id === Number(active.id));
                const newIndex = items.findIndex((item) => item.id === Number(over!.id));

                return arrayMove(items, oldIndex, newIndex);
            });
        }

        setActiveCard(null);
    };

    // drag cancel handler when user cancels dragging
    const handleDragCancel = () => {
        setActiveCard(null);
    };

    // upload new image
    const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        // get all files
        const files = Array.from(e.target.files);

        console.log(files);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.readAsDataURL(file);

            reader.onloadend = () => {
                const newImage = {
                    id: Math.random(),
                    url: reader.result as string,
                    alt: "New Image"
                };
                console.log(newImage);
                setItems((items) => [...items, newImage]);
            };
        });
    };

    // file selection handler
    const itemClickHandler = (image: IGallery) => {
        console.log("clicked", image);

        setItems((items) => {
            return items.map((item) => {
                if (item.id === image.id) {
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
    const cardTitle = selectedItems > 0 ? `${selectedItems} File${selectedItems > 1 ? "s" : ""} Selected` : "Gallery";

    return (
        <div className="card">
            <h2 className="card-header text-3xl font-bold flex justify-between">
                <span>{cardTitle}</span>
                {selectedItems > 0 && (
                    <button className="text-red-500" onClick={deleteSelectedFiles}>
                        Delete Files
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
                    <SortableContext items={items} strategy={rectSortingStrategy}>
                        <Grid columns={5}>
                            {items.map((image, index) => (
                                <SortableCard
                                    key={index}
                                    index={index}
                                    src={image.url}
                                    alt={image.alt}
                                    id={String(image.id)}
                                    onClick={() => itemClickHandler(image)}
                                    checked={Boolean(image.checked)}
                                />
                            ))}
                            <div className="card-item border-2 border-gray-300 border-dashed p-4 bg-gray-50  hover:bg-gray-100 ">
                                <div className="flex items-center justify-center w-full">
                                    <label
                                        htmlFor="dropzone-file"
                                        className="flex flex-col items-center justify-center w-full h-full cursor-pointer ">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
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
                                        <input
                                            multiple
                                            accept="image/*"
                                            id="dropzone-file"
                                            type="file"
                                            className="hidden"
                                            onChange={uploadImage}
                                        />
                                    </label>
                                </div>
                            </div>
                        </Grid>
                    </SortableContext>
                    <DragOverlay adjustScale style={{ transformOrigin: "0 0 " }}>
                        {activeCard ? (
                            <Card src={activeCard.url} alt={activeCard.alt} id={String(activeCard.id)} isDragging />
                        ) : null}
                    </DragOverlay>
                </DndContext>
            </div>
        </div>
    );
};

export default DraggableList;
