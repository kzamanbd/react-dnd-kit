import { FC } from "react";

type GridProps = {
    columns: number;
    children: React.ReactNode;
};

const Grid: FC<GridProps> = ({ children, columns }) => {
    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                gridGap: 24,
                width: "100%"
            }}>
            {children}
        </div>
    );
};

export default Grid;
