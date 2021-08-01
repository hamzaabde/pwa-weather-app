import React, { useState, useEffect, useCallback } from 'react'
import { scaleBand, scaleLinear } from 'd3-scale'
import { line, curveNatural } from 'd3-shape'

// hooks
import { useVariableDimensions } from '../hooks/size'

const max = arr => Math.max(...arr)
const min = arr => Math.min(...arr)

const Marks = ({ data, type, yScale, xScale }) => {
    let dataset

    if (type == 'daily') {
        const maxTempData = data.map(d => ({
            temperature: d.temperature.maxTemp,
            date: d.date,
            icon: d.icon,
        }))
        const minTempData = data.map(d => ({
            temperature: d.temperature.minTemp,
            date: d.date,
            icon: d.icon,
        }))
        const temp = [...minTempData, ...maxTempData]

        dataset = temp
    } else {
        dataset = data
    }

    const x = d => xScale(d.date) + xScale.bandwidth() / 2
    const y = d => yScale(d.temperature)

    return (
        <>
            {dataset.map((d, i) => (
                <g
                    key={i}
                    className="marks"
                    transform={`translate(${x(d)}, ${y(d)})`}
                >
                    <circle r={3} />
                    <text
                        className="mark-y-value"
                        x={2}
                        y={-10}
                        textAnchor="middle"
                    >
                        {d.temperature + '°'}
                    </text>
                </g>
            ))}
        </>
    )
}

const Line = ({ data, type, yScale, xScale }) => {
    const graphLine = line()

    let lines

    if (type == 'daily') {
        const maxTempData = data.map(d => ({
            temperature: d.temperature.maxTemp,
            date: d.date,
            icon: d.icon,
        }))
        const minTempData = data.map(d => ({
            temperature: d.temperature.minTemp,
            date: d.date,
            icon: d.icon,
        }))

        lines = [minTempData, maxTempData]
    } else {
        lines = [data]
    }

    return (
        <g>
            {lines.map(dataset =>
                dataset.map((d, i) => (
                    <path
                        key={i}
                        fill="none"
                        stroke="grey"
                        className="line"
                        d={graphLine
                            .x(d => xScale(d.date) + xScale.bandwidth() / 2)
                            .y(d => yScale(d.temperature))
                            .curve(curveNatural)(dataset)}
                    />
                ))
            )}
        </g>
    )
}

const GraphLines = ({ data, xScale, height, margin }) => {
    return (
        <g className="graph-lines">
            <line y1={-margin.top} y2={height} stroke="black" />
            {data.map((d, i) => (
                <line
                    key={i}
                    x1={xScale(d.date) + xScale.bandwidth()}
                    y1={-margin.top}
                    x2={xScale(d.date) + xScale.bandwidth()}
                    y2={height}
                    stroke="black"
                />
            ))}
        </g>
    )
}

const AxisBottom = ({ data, xScale, height, margin }) => {
    return (
        <g className="x-axis" transform={`translate(0, ${-margin.top})`}>
            {data.map((d, i) => (
                <g
                    key={i}
                    className="band"
                    transform={`translate(${
                        xScale(d.date) + xScale.bandwidth() / 2
                    },${height})`}
                >
                    <text className="x-axis-value" textAnchor="middle" y={-2}>
                        {d.date}
                    </text>
                </g>
            ))}
        </g>
    )
}

const scales = (data, type, innerWidth, innerHeight) => {
    let yScale
    if (type == 'daily') {
        const maxTempData = data.map(d => d.temperature.maxTemp)
        const minTempData = data.map(d => d.temperature.minTemp)
        const temp = [...minTempData, ...maxTempData]

        yScale = scaleLinear()
            .domain([min(temp) - 5, max(temp) + 5])
            .range([innerHeight, 0])
    } else {
        yScale = scaleLinear()
            .domain([
                min(data.map(d => d.temperature)) - 5,
                max(data.map(d => d.temperature)) + 5,
            ])
            .range([innerHeight, 0])
    }

    const xScale = scaleBand()
        .domain(data.map(d => d.date))
        .range([0, innerWidth])

    return { yScale, xScale }
}

// weather temperature graph component
const LineGraph = ({ data, type }) => {
    const { width, height, margin } = useVariableDimensions()

    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    const { yScale, xScale } = scales(data, type, innerWidth, innerHeight)

    return (
        <svg width={width} height={height}>
            <g
                className="dots"
                transform={`translate(${margin.left},${margin.top})`}
            >
                <Line data={data} type={type} yScale={yScale} xScale={xScale} />
                <Marks
                    data={data}
                    type={type}
                    yScale={yScale}
                    xScale={xScale}
                />
                <GraphLines
                    data={data}
                    yScale={yScale}
                    xScale={xScale}
                    height={height}
                    margin={margin}
                />
                <AxisBottom
                    data={data}
                    xScale={xScale}
                    height={height}
                    margin={margin}
                />
            </g>
        </svg>
    )
}

export default LineGraph
