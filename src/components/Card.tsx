import { CSSProperties, HTMLAttributes, forwardRef } from "react";

export type CardProps = HTMLAttributes<HTMLDivElement> & {
    id: string;
    src: string;
    alt: string;
    withOpacity?: boolean;
    isDragging?: boolean;
    index?: number;
    checked?: boolean;
};

const Card = forwardRef<HTMLDivElement, CardProps>(({ withOpacity, isDragging, style, ...props }, ref) => {
    const inlineStyles: CSSProperties = {
        opacity: withOpacity ? "0.5" : "1",
        cursor: isDragging ? "grabbing" : "grab",
        boxShadow: isDragging
            ? "rgb(63 63 68 / 5%) 0px 2px 0px 2px, rgb(34 33 81 / 15%) 0px 2px 3px 2px"
            : "rgb(63 63 68 / 5%) 0px 0px 0px 1px, rgb(34 33 81 / 15%) 0px 1px 3px 0px",
        transform: isDragging ? "scale(1.05)" : "scale(1)",
        ...style
    };

    if (props.index === 0) {
        inlineStyles.gridRowStart = "span 2";
        inlineStyles.gridColumnStart = "span 2";
        inlineStyles.height = "auto";
        inlineStyles.width = "auto";
    }

    return (
        <div className="card-item group" ref={ref} style={inlineStyles} {...props}>
            <div className="overlay group-hover:scale-100 scale-0 duration-300 transition-transform"></div>
            <input
                type="checkbox"
                checked={props.checked}
                onChange={() => null}
                className={`g-checkbox ${
                    !props.checked && "group-hover:scale-100 scale-0 duration-300 transition-transform"
                }`}
            />
            <img className="h-full w-full object-cover max-w-full rounded-xl" src={props.src} alt={props.alt} />
        </div>
    );
});

export default Card;
