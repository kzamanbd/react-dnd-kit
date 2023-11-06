import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FC } from "react";
import Card, { CardProps } from "./Card";

const SortableCard: FC<CardProps> = (props) => {
    const { isDragging, attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition: transition || undefined
    };

    return <Card ref={setNodeRef} style={style} withOpacity={isDragging} {...props} {...attributes} {...listeners} />;
};

export default SortableCard;
