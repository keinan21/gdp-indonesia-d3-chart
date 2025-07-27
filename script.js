import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

let width = 720;
let height = 500;
const marginTop = 20;
const marginRight = 40;
const marginBottom = 30;
const marginLeft = 40;
let database = [
    ["1960-12-31", 52.7776078448164],
    ["1961-12-31", 55.807383384864],
    ["1962-12-31", 56.8353429430885],
    ["1963-12-31", 55.5639192789667],
    ["1964-12-31", 57.5251579097895],
    ["1965-12-31", 58.1473439581915],
    ["1966-12-31", 59.7704379975003],
    ["1967-12-31", 60.5955108008184],
    ["1968-12-31", 67.2096190109976],
    ["1969-12-31", 71.7948596720359],
    // Tahun 1970 - 1979
    ["1970-12-31", 77.2186989200559],
    ["1971-12-31", 82.6425381680759],
    ["1972-12-31", 88.4586251422643],
    ["1973-12-31", 95.627290482537],
    ["1974-12-31", 102.928121319277],
    ["1975-12-31", 108.051163593775],
    ["1976-12-31", 115.49217717931],
    ["1977-12-31", 125.610822865747],
    ["1978-12-31", 134.110994997818],
    ["1979-12-31", 143.93369932567],
    // Tahun 1980 - 1989
    ["1980-12-31", 158.154460398846],
    ["1981-12-31", 170.691612499017],
    ["1982-12-31", 174.526106274393],
    ["1983-12-31", 181.843928959468],
    ["1984-12-31", 194.528502792725],
    ["1985-12-31", 199.31807380482],
    ["1986-12-31", 211.028100540478],
    ["1987-12-31", 221.423191492769],
    ["1988-12-31", 234.222555729351],
    ["1989-12-31", 251.687564195661],
    // Tahun 1990 - 1999
    ["1990-12-31", 269.915108912607],
    ["1991-12-31", 288.571594912183],
    ["1992-12-31", 307.321553097314],
    ["1993-12-31", 327.28641542863],
    ["1994-12-31", 351.963716551494],
    ["1995-12-31", 380.895160093945],
    ["1996-12-31", 410.674256276219],
    ["1997-12-31", 429.975448805372],
    ["1998-12-31", 373.533751956055], // Krisis Asia
    ["1999-12-31", 376.488874892846],
    // Tahun 2000 - 2009
    ["2000-12-31", 395.012382597556],
    ["2001-12-31", 409.404526219842],
    ["2002-12-31", 427.825582126161],
    ["2003-12-31", 448.277224148753],
    ["2004-12-31", 470.829486219898],
    ["2005-12-31", 497.63179044244],
    ["2006-12-31", 525.006275302523],
    ["2007-12-31", 558.318040161892],
    ["2008-12-31", 591.893632243067],
    ["2009-12-31", 619.291626017383],
    // Tahun 2010 - 2019
    ["2010-12-31", 657.835433773518],
    ["2011-12-31", 698.422460479197],
    ["2012-12-31", 740.537688618414],
    ["2013-12-31", 781.691320690699],
    ["2014-12-31", 820.828013230588],
    ["2015-12-31", 860.854232686214],
    ["2016-12-31", 904.181621780388],
    ["2017-12-31", 950.021694164001],
    ["2018-12-31", 999.178586309021],
    ["2019-12-31", 1049.33023399745],
    // Tahun 2020 - 2024
    ["2020-12-31", 1027.65619388538], // Pandemi COVID-19
    ["2021-12-31", 1065.70912739686],
    ["2022-12-31", 1122.2684126502],
    ["2023-12-31", 1178.9320064995],
    ["2024-12-31", 1238.23635013656]
];

const gantiTemplate = (date) => {
  let tanggal = date.split("-");
  return tanggal[0]
};



const renderChart = () => {
    width = container.clientWidth - 50;
    height = container.clientHeight;
    console.log(width + "   " + height)

  const x = d3
    .scaleUtc()
    .domain([new Date("1960-12-31"), new Date("2025-12-31")])
    .range([marginLeft, width - marginRight]);

  const y = d3
    .scaleLinear()
    .domain([0, 1397])
    .range([height - marginBottom, marginTop]);

  const svg = d3.create("svg")
                .attr("width", width)
                .attr("height", height)
                .attr('id', 'svg');

  svg
    .append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .attr('id', 'x-axis')
    .call(d3.axisBottom(x))
    .attr('class', 'tick')
    

  svg
    .append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .attr('id', 'y-axis')
    .call(d3.axisLeft(y))
    .attr('class', 'tick')
    

  svg
    .selectAll("rect")
    .data(database)
    .enter()
    .append("rect")
    .attr("x", (d, i) => x(new Date(d[0])))
    .attr("y", (d) => y(d[1]))
    .attr("width", ((width - marginLeft - marginRight)/database.length) - 1)
    .attr("height", (d) => height - marginBottom - y(d[1]))
    .attr("fill", "#0A400C")
    .attr('class', 'bar')
    .attr('data-date', d => d[0])
    .attr('data-gdp', d => d[1])
    .on("mouseover", function(event, d) {
        d3.select(this).attr('fill', '#A2AF9B');
      d3.select("#tooltip")
        .style("opacity", 1)
        .html(`Tahun ${gantiTemplate(d[0])} <br> $${parseInt(d[1]) } Miliar USD`)
        .style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY - 28) + "px");
    
    })
    .on("mouseout", function(event, d) {
        d3.select(this).attr('fill', '#0A400C')
      d3.select("#tooltip").style("opacity", 0).style("left", (event.pageX + 30) + "px").style("top", "0px");
      
      
    });

  
  container.append(svg.node());
};

renderChart();

addEventListener('resize', () => {
  d3.select("svg").remove()
  renderChart()
})
