import React from "react";
import { DragDropContext, DragUpdate, Draggable, Droppable } from "react-beautiful-dnd";
import { useGallery } from "../hooks/useGallery";
import { IGallery } from "../types";

// a little function to help us with reordering the result
const reorder = (list: IGallery[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const DraggableList = () => {
    const { images } = useGallery();
    const [items, setItems] = React.useState<IGallery[]>(images);

    const onDragEnd = (result: DragUpdate) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }
        console.log(result);
        const recordedItems = reorder(items, result.source.index, result.destination.index) as IGallery[];

        console.log(recordedItems);

        setItems(recordedItems);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        className="flex flex-wrap gap-4 max-w-5xl mx-auto my-5"
                        {...provided.droppableProps}>
                        {items.map((item: IGallery, index) => (
                            <Draggable key={item.id} draggableId={"item-" + item.id} index={index}>
                                {(provided) => (
                                    <img
                                        ref={provided.innerRef}
                                        {...provided.dragHandleProps}
                                        {...provided.draggableProps}
                                        className="gallery-img"
                                        src={item.url}
                                        alt={item.alt}
                                    />
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default DraggableList;
