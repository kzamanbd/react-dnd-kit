import { CSSProperties, HTMLAttributes, forwardRef } from "react";

export type CardProps = HTMLAttributes<HTMLDivElement> & {
    id: string;
    src: string;
    alt: string;
    withOpacity?: boolean;
    isDragging?: boolean;
    index?: number;
};

const Card = forwardRef<HTMLDivElement, CardProps>(({ src, alt, withOpacity, isDragging, style, ...props }, ref) => {
    const inlineStyles: CSSProperties = {
        opacity: withOpacity ? "0.5" : "1",
        transformOrigin: "50% 50%",
        borderRadius: "10px",
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
        <div className="card-item" ref={ref} style={inlineStyles} {...props}>
            <img className="h-full w-full object-cover max-w-full rounded-xl border-2" src={src} alt={alt} />
        </div>
    );
});

export default Card;
