import React from 'react';
import PropTypes from 'prop-types';
import { withFauxDOM } from 'react-faux-dom'
import { scaleLinear, scaleBand } from 'd3-scale';
import { select, selectAll } from 'd3-selection';
import { transition } from 'd3-transition';
import { line } from 'd3-shape';
import { extent } from 'd3-array';
import { axisBottom, axisLeft } from 'd3-axis';
import { format } from 'd3-format';
import { csv } from 'd3-fetch';

class LineChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
    }
  }

  componentWillMount() {
    csv('data/timeseries.csv').then((data) => {
      this.setState({data: {...data}});
    });
  }

  componentDidMount() {
    // this.renderD3();
  }

  componentDidUpdate(prevProps, prevState) {
    // if (this.props.data !== prevProps.data) {
    //   this.updateD3();
    // }
  }

  render() {
    return (
      <div>
        {this.props.chart}
      </div>
    )
  }

  renderD3() {
    let faux = this.props.connectFauxDOM('div', 'chart');

    const { width, height, margins, data } = this.props;

    const svgWidth = width - margins.left - margins.right;
    const svgHeight = height - margins.top - margins.bottom;
    const padding = 30;

    const xExtent = extent(data, (d) => d.year);
    const xRange = xExtent[1] - xExtent[0];
    const yExtent = extent(data, (d) => d.population);
    const yRange = yExtent[1] - yExtent[0];

    const x = scaleLinear()
      .range([0, svgWidth])
      .domain([xExtent[0] - (xRange * .05), xExtent[1] + (xRange * .05)]);

    const y = scaleLinear()
      .range([svgHeight, 0])
      .domain([yExtent[0] - (yRange * .05), yExtent[1] + (yRange * .05)]);

    const xAxis = axisBottom(x)
      .ticks(6, format('4d'));

    const yAxis = axisLeft(y)
      .ticks(5, format('.0s'));

    let svg = select(faux).append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('data', null)
      .append('g')
      .attr('transform', `translate(${margins.left}, ${margins.top})`);

    const clipArea = svg.append('clipPath')
      .attr('id', 'line-area')
      .append('rect')
      .attr('x', 5)
      .attr('y', 0)
      .attr('width', (width - (2 * padding)) + 10)
      .attr('height', (height - (2 * padding)) + 10)
      .attr('style', {border: '1px solid red'});

    const circles = svg.append('g')
      .attr('clipPath', 'url(#line-area)')
      .selectAll('.circles')
      .data(data)
      .enter().append('circle')
      .attr('class', 'circles')
      .attr('cx', (d) => (x(d.year)))
      .attr('cy', (d) => (y(d.population)))
      .attr('r', 5)
      .attr('fill', '#4dac26')
      .attr('stroke', '#ffffff');

    const sparkline = line()
      .defined(d => d.population)
      .x((d) => x(d.year))
      .y((d) => y(d.population));

    svg.append('path')
      .datum(data)
      .attr('class', 'line')
      .attr('fill', 'none')
      .attr('stroke', '#4dac26')
      .attr('stroke-width', 1.5)
      .attr('d', sparkline);

    svg.append('g')
      .attr('transform', `translate(0, ${svgHeight})`)
      .attr('class', 'x-axis')
      .call(xAxis);

    svg.append('g')
      .attr('class', 'y-axis')
      .call(yAxis);

    svg.append('text')
      .attr('style', "font-size: 10; text-anchor: 'middle';")
      .attr('transform', `translate(${width / 2}, ${height - 5})`)
      .text('Year');

    svg.append('text')
      .attr('style', "font-size: 10; text-anchor: 'middle';")
      .attr('x', 0 - (height / 2))
      .attr('y', 0)
      .attr('transform', 'rotate(-90)')
      .text('Population');

    this.props.animateFauxDOM(800);
  }

  updateD3() {
    let faux = this.props.connectFauxDOM('div', 'chart');

    const { width, height, margins, data } = this.props;

    const svgWidth = width - margins.left - margins.right;
    const svgHeight = height - margins.top - margins.bottom;

    const t = transition().duration(500);

    const xExtent = extent(data, (d) => d.year);
    const xRange = xExtent[1] - xExtent[0];
    const yExtent = extent(data, (d) => d.population);
    const yRange = yExtent[1] - yExtent[0];

    const x = scaleLinear()
      .range([0, svgWidth])
      .domain([xExtent[0] - (xRange * .05), xExtent[1] + (xRange * .05)]);

    const y = scaleLinear()
      .range([svgHeight, 0])
      .domain([yExtent[0] - (yRange * .05), yExtent[1] + (yRange * .05)]);

    const xAxis = axisBottom(x)
      .ticks(6, format('4d'));

    const yAxis = axisLeft(y)
      .ticks(5, format('.0s'));

    let svg = select(faux).select('svg');

    let circles = svg.select('g')
      .selectAll('.circles')
      .data(data);

    circles.exit().remove();

    const newCircles = circles.enter()
      .append('circle')
      .attr('cx', (d) => (x(d.year)))
      .attr('cy', (d) => (y(d.population)));

    newCircles.merge(circles)
      .transition(t)
      .attr('cy', (d) => (y(d.population)));

    let linepath = svg.select('g').select('.line');

    const sparkline = line()
      .defined(d => d.population)
      .x((d) => x(d.year))
      .y((d) => y(d.population));

    linepath.datum(data)
      .transition(t)
      .attr('d', sparkline);

    svg.select(".y-axis")
      .transition(t)
      .call(yAxis)

    this.props.animateFauxDOM(800);
  }
}

LineChart.defaultProps = {
  chart: 'loading'
}

const FauxLineChart = withFauxDOM(LineChart);

export default FauxLineChart;
