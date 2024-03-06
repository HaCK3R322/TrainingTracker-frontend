import React from 'react';
import { Chart } from 'react-charts';

const ErmGraphic = ({ ermData }) => {
    // Format data for react-charts
    const data = React.useMemo(
        () => [
            {
                label: 'Numbers',
                data: ermData.map((value, index) => ({
                    x: index + 1,
                    y: value,
                })),
            },
        ],
        [ermData]
    );

    const axes = React.useMemo(
        () => [
            {
                primary: true,
                type: 'linear',
                position: 'bottom',
                show: true
            },
            { type: 'linear', position: 'left' },
        ],
        []
    );

    const tooltip = React.useMemo(
        () => ({
            format: (value, axis) => {
                return axis.show && value ? `${value}` : null;
            },
        }),
        []
    );

    return (
        <div style={{
            position: "absolute",
            top: "100px",
            width: '80%',
            height: '300px',
            backgroundColor: "white",
            borderRadius: "5px",
            left: "10%"
        }}>
            <Chart data={data} axes={axes} tooltip={tooltip}/>
        </div>
    );
};

export default ErmGraphic;
