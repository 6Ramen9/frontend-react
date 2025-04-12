import React from 'react';
import {
    PieChart, Pie, Tooltip, ResponsiveContainer, Cell
} from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

const PieChartComponent = ({ data }) => {
    if (!data || data.length === 0) return <p>Chargement...</p>;

    return (
        <div className="chart-container">
            <h2 className="chart-title">Min / Avg / Max - Pie Chart</h2>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={100}
                        label
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-pie-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PieChartComponent;
