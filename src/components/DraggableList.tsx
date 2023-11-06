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
import { FC, useCallback, useState } from "react";
import { useGallery } from "../hooks/useGallery";
import { IGallery } from "../types";
import Card from "./Card";
import Grid from "./Grid";
import SortableCard from "./SortableCard";

const DraggableList: FC = () => {
    const { images } = useGallery();
    const [items, setItems] = useState(images);
    const [activeCard, setActiveCard] = useState<IGallery | null>(null);
    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

    const handleDragStart = useCallback(
        (event: DragStartEvent) => {
            const item = items.find((image) => image.id === Number(event.active.id));
            setActiveCard(item || null);
        },
        [items]
    );
    const handleDragEnd = useCallback((event: DragEndEvent) => {
        const { active, over } = event;

        console.log(active, over);

        if (active.id !== over?.id) {
            setItems((items) => {
                const oldIndex = items.findIndex((item) => item.id === Number(active.id));
                const newIndex = items.findIndex((item) => item.id === Number(over!.id));

                return arrayMove(items, oldIndex, newIndex);
            });
        }

        setActiveCard(null);
    }, []);

    const handleDragCancel = useCallback(() => {
        setActiveCard(null);
    }, []);

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}>
            <SortableContext items={items} strategy={rectSortingStrategy}>
                <Grid columns={5}>
                    {items.map((image, index) => (
                        <SortableCard index={index} key={index} src={image.url} alt={image.alt} id={String(image.id)} />
                    ))}
                </Grid>
            </SortableContext>
            <DragOverlay adjustScale style={{ transformOrigin: "0 0 " }}>
                {activeCard ? (
                    <Card src={activeCard.url} alt={activeCard.alt} id={String(activeCard.id)} isDragging />
                ) : null}
            </DragOverlay>
        </DndContext>
    );
};

export default DraggableList;
