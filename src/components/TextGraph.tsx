import React, { JSX, useEffect, useRef } from 'react'
import * as d3 from 'd3'

type Node = {
  id: number
  text: string
}

type Link = {
  id: number
  source: number
  target: number
}

type TextGraphProps = {
  width: number
  height: number
  nodes: Node[]
  links: Link[]
  className?: string
}

export default function TextGraph({
  width = 200,
  height = 200,
  nodes = [],
  links = [],
  className,
}: TextGraphProps): JSX.Element {
  const svg = useRef<SVGSVGElement>(null)

  useEffect(() => {
    drawGraph(svg, width, height, nodes, links)
  }, [svg, width, height, nodes, links])

  return (
    <svg
      className={` ${className ?? ''}`}
      ref={svg}
      width={width}
      height={height}
    />
  )
}

function drawGraph(
  svgRef: React.RefObject<SVGSVGElement>,
  width: number,
  height: number,
  propNodes: Node[],
  propLinks: Link[]
) {
  const nodes = propNodes.map((n) => ({
    ...n,
    x: width / 2,
    y: height / 2,
  })) as (Node & d3.SimulationNodeDatum)[]
  const links = propLinks.map((l) => {
    return {
      ...l,
    }
  })

  const svg = d3
    .select(svgRef.current)
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', [0, 0, width, height])
    .attr('style', 'max-width: 100%; height: auto;')

  const simulation = d3
    .forceSimulation(nodes)
    .force(
      'link',
      d3
        .forceLink(links)
        .id((d) => (d as Node).id)
        .distance(200)
    )
    .force('charge', d3.forceManyBody().strength(-300))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .on('tick', ticked)

  const link = svg
    .append('g')
    .attr('stroke', '#AAA')
    .attr('stroke-opacity', 0.6)
    .selectAll()
    .data(links)
    .join('line')
  const node = svg
    .append('g')
    .attr('stroke', '#333')
    .selectAll()
    .data(nodes)
    .join('g')
    .style('cursor', 'pointer')

  node.each(function (d) {
    const nodeGroup = d3.select(this)
    const lines = (d as Node).text.split('\n')
    lines.forEach((line: string, index: number) => {
      nodeGroup
        .append('text')
        .style('text-anchor', 'middle')
        .attr('dy', `${index * 1.2}em`)
        .text(line)
    })
  })
  ;(
    node as d3.Selection<
      SVGGElement,
      Node & d3.SimulationNodeDatum,
      SVGGElement,
      unknown
    >
  ).call(
    d3
      .drag<SVGGElement, Node & d3.SimulationNodeDatum>()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended)
  )

  function ticked() {
    link
      .attr('x1', (d) => (d.source as d3.SimulationNodeDatum).x || 0)
      .attr('y1', (d) => (d.source as d3.SimulationNodeDatum).y || 0)
      .attr('x2', (d) => (d.target as d3.SimulationNodeDatum).x || 0)
      .attr('y2', (d) => (d.target as d3.SimulationNodeDatum).y || 0)
    node.attr('transform', (d) => `translate(${d.x || 0}, ${d.y || 0})`)
  }

  function dragstarted(
    event: d3.D3DragEvent<
      SVGGElement,
      Node & d3.SimulationNodeDatum,
      Node & d3.SimulationNodeDatum
    >
  ) {
    if (!event.active) simulation.alphaTarget(0.3).restart()
    event.subject.fx = event.subject.x
    event.subject.fy = event.subject.y
  }

  function dragged(
    event: d3.D3DragEvent<
      SVGGElement,
      Node & d3.SimulationNodeDatum,
      Node & d3.SimulationNodeDatum
    >
  ) {
    event.subject.fx = event.x
    event.subject.fy = event.y
  }

  function dragended(
    event: d3.D3DragEvent<
      SVGGElement,
      Node & d3.SimulationNodeDatum,
      Node & d3.SimulationNodeDatum
    >
  ) {
    if (!event.active) simulation.alphaTarget(0)
    event.subject.fx = null
    event.subject.fy = null
  }
}
