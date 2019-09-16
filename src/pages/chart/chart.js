import React from 'react';
import {format} from 'd3-format';

import RadarChart from 'radar-chart';

const DATA = [
    {
        name: 'Mercedes',
        mileage: 7,
        price: 10,
        safety: 8,
        performance: 9,
        interior: 7,
        warranty: 7
    },
    {
        name: 'Honda',
        mileage: 8,
        price: 6,
        safety: 9,
        performance: 6,
        interior: 3,
        warranty: 9
    },
    {
        name: 'Chevrolet',
        mileage: 5,
        price: 4,
        safety: 6,
        performance: 4,
        interior: 5,
        warranty: 6
    }
];

const basicFormat = format('.2r');
const wideFormat = format('.3r');

export default function BasicRadarChart(props) {
    return (
        <RadarChart
            data={DATA}
            tickFormat={t => wideFormat(t)}
            startingAngle={0}
            domains={[
                {name: 'mileage', domain: [0, 10]},
                {
                    name: 'price',
                    domain: [2, 16],
                    tickFormat: t => `$${basicFormat(t)}`,
                    getValue: d => d.price
                },
                {name: 'safety', domain: [5, 10], getValue: d => d.safety},
                {name: 'performance', domain: [0, 10], getValue: d => d.performance},
                {name: 'interior', domain: [0, 7], getValue: d => d.interior},
                {name: 'warranty', domain: [10, 2], getValue: d => d.warranty}
            ]}
            width={400}
            height={300}
        />
    );
}
