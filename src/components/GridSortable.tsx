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
import { SortableContext, arrayMove, rectSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { CSSProperties, FC, HTMLAttributes, forwardRef, useCallback, useState } from 'react';

type CardProps = HTMLAttributes<HTMLDivElement> & {
    id: string;
    withOpacity?: boolean;
    isDragging?: boolean;
    index?: number;
    checked?: boolean;
};

const BoxCard = forwardRef<HTMLDivElement, CardProps>(({ index, withOpacity, isDragging, style, ...props }, ref) => {
    const inlineStyles: CSSProperties = {
        opacity: withOpacity ? '0.5' : '1',
        cursor: isDragging ? 'grabbing' : 'grab',
        boxShadow: isDragging
            ? 'rgb(63 63 68 / 5%) 0px 2px 0px 2px, rgb(34 33 81 / 15%) 0px 2px 3px 2px'
            : 'rgb(63 63 68 / 5%) 0px 0px 0px 1px, rgb(34 33 81 / 15%) 0px 1px 3px 0px',
        transform: isDragging ? 'scale(1.05)' : 'scale(1)',
        transformOrigin: '0 0',
        ...style
    };

    if (index == 0) {
        inlineStyles.gridColumn = 'span 2';
        inlineStyles.gridRow = 'span 2';
    }

    return (
        <div className={`card-item group ${props.checked && 'checked'}`} ref={ref} style={inlineStyles} {...props}>
            {!isDragging ? (
                <>
                    {!props.checked ? (
                        <div className="overlay group-hover:scale-100 scale-0 duration-300 transition-transform"></div>
                    ) : null}
                    <input
                        type="checkbox"
                        checked={props.checked}
                        onChange={() => null}
                        className={`g-checkbox ${
                            !props.checked && 'group-hover:scale-100 scale-0 duration-300 transition-transform'
                        }`}
                    />
                </>
            ) : null}
            {props.id}
        </div>
    );
});

const BoxSortable: FC<CardProps> = (props) => {
    const { isDragging, attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: props.id
        // transition: {
        //     duration: 1500, // milliseconds
        //     easing: "cubic-bezier(0.25, 1, 0.5, 1)"
        // }
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition: transition || undefined
    };

    return (
        <BoxCard ref={setNodeRef} style={style} withOpacity={isDragging} {...props} {...attributes} {...listeners} />
    );
};

const GridSortable = () => {
    const [items, setItems] = useState(Array.from(Array(22).keys(), (i) => i + 1).map((id) => id + ''));
    const [activeId, setActiveId] = useState<string | null>();
    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: {
                distance: 10
            }
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                distance: 10
            }
        })
    );

    const handleDragStart = useCallback((event: DragStartEvent) => {
        setActiveId(String(event.active.id));
    }, []);

    const handleDragEnd = useCallback((event: DragEndEvent) => {
        const { active, over } = event;

        console.log(active, over);

        if (active.id !== over?.id) {
            setItems((items) => {
                const oldIndex = items.findIndex((item) => item === String(active.id));
                const newIndex = items.findIndex((item) => item === String(over?.id));
                console.log(oldIndex, newIndex);

                return arrayMove(items, oldIndex, newIndex);
            });
        }

        setActiveId(undefined);
    }, []);

    const handleDragCancel = useCallback(() => {
        setActiveId(undefined);
    }, []);

    return (
        <div className="card border mt-2">
            <h2 className="card-header flex justify-between">Grid Sortable</h2>
            <div className="card-body">
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    onDragCancel={handleDragCancel}>
                    <SortableContext items={items} strategy={rectSortingStrategy}>
                        <div className="grid gap-3 lg:grid-cols-5 md:grid-cols-3 grid-cols-2">
                            {items.map((item, index) => (
                                <BoxSortable index={index} key={index} id={item} />
                            ))}
                        </div>
                    </SortableContext>
                    <DragOverlay adjustScale>{activeId ? <BoxCard id={activeId} isDragging /> : null}</DragOverlay>
                </DndContext>
            </div>
        </div>
    );
};

export default GridSortable;
