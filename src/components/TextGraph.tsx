import React, { JSX, useEffect, useRef } from 'react'
import * as d3 from 'd3'

type PropNode = {
  id: number
  text: string
}

type PropLink = {
  id: number
  source: number
  target: number
}

type Node = PropNode & {
  x: number
  y: number
}

type Link = {
  id: number
  source: {
    id: number
    x: number
    y: number
  }
  target: {
    id: number
    x: number
    y: number
  }
}

type TextGraphProps = {
  width: number
  height: number
  nodes: PropNode[]
  links: PropLink[]
}

export default function TextGraph({
  width = 200,
  height = 200,
  nodes = [],
  links = [],
}: TextGraphProps): JSX.Element {
  const svg = useRef<SVGSVGElement>(null)

  useEffect(() => {
    drawGraph(svg, width, height, nodes, links)
  }, [svg, width, height, nodes, links])

  return <svg ref={svg} width={width} height={height} />
}

function drawGraph(
  svgRef: React.RefObject<SVGSVGElement>,
  width: number,
  height: number,
  propNodes: PropNode[],
  propLinks: PropLink[]
) {
  const nodes: Node[] = propNodes.map((n) => {
    return {
      ...n,
      x: width / 2,
      y: height / 2,
    }
  })
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
      d3.forceLink(links).id((d) => (d as Node).id)
    )
    .force('charge', d3.forceManyBody())
    .force('center', d3.forceCenter(width / 2, height / 2))
    .on('tick', ticked)

  const link = svg
    .append('g')
    .attr('stroke', '#333')
    .attr('stroke-opacity', 0.6)
    .selectAll()
    .data(links)
    .join('line')
  const node = svg
    .append('g')
    .attr('stroke', 'black')
    .attr('stroke-width', 1.5)
    .selectAll()
    .data(nodes)
    .join('text')
    .style('text-anchor', 'middle')
    .style('cursor', 'pointer')
    .text((d) => d.text)

  function ticked() {
    link
      .attr('x1', (d: any) => d.source.x)
      .attr('y1', (d: any) => d.source.y)
      .attr('x2', (d: any) => d.target.x)
      .attr('y2', (d: any) => d.target.y)
    node.attr('x', (d) => d.x).attr('y', (d) => d.y)
  }

  node.call(
    d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended)
  )
  function dragstarted(event: any) {
    if (!event.active) simulation.alphaTarget(0.3).restart()
    event.subject.fx = event.subject.x
    event.subject.fy = event.subject.y
  }

  function dragged(event: any) {
    event.subject.fx = event.x
    event.subject.fy = event.y
  }

  function dragended(event: any) {
    if (!event.active) simulation.alphaTarget(0)
    event.subject.fx = null
    event.subject.fy = null
  }
}
