import * as d3 from "d3";
import { Col, Empty, Row } from "antd";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import allComponentsStyle from "../styles/modules/componentStyles/AllComponents.module.css";

const DonutChart = () => {
    const { donutExams } = useSelector((state) => state.exam);

    useEffect(() => {
        function drawChart(width, height) {
            const outerRadius = 100;
            const radius = Math.min(width, height) / 2;

            // const colors = ["#ff7e05", "#fcb25d", "#ffc98c", "#fc941c"];
            const colors = d3
                .scaleOrdinal()
                .domain([">= 75%", "50-75%", "35-50%", "0-35%"])
                .range(["#ff7e05", "#fc941c", "#fcb25d", "#ffc98c"]);

            // Remove the old svg
            d3.select("#pie-container").select("svg").remove();

            // Create new svg
            const svg = d3
                .select("#pie-container")
                .append("svg")
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", `translate(${width / 2.2}, ${height / 2})`);

            const arcGenerator = d3
                .arc()
                .innerRadius(radius * 0.6)
                .outerRadius(radius * 0.85)
                .cornerRadius(3);

            const outerArc = d3
                .arc()
                .innerRadius(radius * 0.82)
                .outerRadius(radius * 1.1);

            const pieGenerator = d3
                .pie()
                .padAngle(2 / outerRadius)
                // .startAngle(1.3 * Math.PI)
                // .endAngle(3.3 * Math.PI)
                .value((d) => {
                    return d.data && d.data[1].count;
                })
                .sort(null);

            const dataReady = pieGenerator(Object.entries(donutExams));

            // function tween(d, i) {
            //     let s0;
            //     let e0;
            //     if (dataReady[i]) {
            //         s0 = dataReady[i].startAngle;
            //         e0 = dataReady[i].endAngle;
            //     } else if (!dataReady[i] && dataReady[i - 1]) {
            //         s0 = dataReady[i - 1].endAngle;
            //         e0 = dataReady[i - 1].endAngle;
            //     } else if (!dataReady[i - 1] && dataReady.length > 0) {
            //         s0 = dataReady[dataReady.length - 1].endAngle;
            //         e0 = dataReady[dataReady.length - 1].endAngle;
            //     } else {
            //         s0 = 0;
            //         e0 = 0;
            //     }
            //     const c = d3.interpolate(
            //         { startAngle: s0, endAngle: e0 },
            //         { startAngle: d.startAngle, endAngle: d.endAngle }
            //     );
            //     return (t) => {
            //         const b = c(t);
            //         return arcGenerator(b);
            //     };
            // }

            const arc = svg.selectAll().data(pieGenerator(dataReady)).enter();

            const angleInterpolation = d3.interpolate(
                pieGenerator.startAngle()(),
                pieGenerator.endAngle()()
            );

            arc.append("path")
                .attr("d", arcGenerator)
                .attr("key", (d) => colors(d.data.data[1].label))
                .attr("fill", (d) => colors(d.data.data[1].label))
                .attr("stroke", "white")
                .style("stroke-width", "1px")
                .transition()
                .duration(1300)
                // .attrTween("d", tween);
                .attrTween("d", (d) => {
                    const originalEnd = d.endAngle;

                    return (t) => {
                        const currentAngle = angleInterpolation(t);
                        if (currentAngle < d.startAngle) {
                            return "";
                        }
                        const updatedD = d;
                        updatedD.endAngle = Math.min(currentAngle, originalEnd);
                        return arcGenerator(updatedD);
                    };
                });

            // arc.append("polyline")
            //     .attr("stroke", (d) => colors(d.data.data[1].label))
            //     .style("fill", "none")
            //     .attr("stroke-width", 1)
            //     .transition()
            //     .delay(900)
            //     .ease(d3.easeLinear)
            //     .attr("points", (d) => {
            //         const posA = arcGenerator.centroid(
            //             d.data.data[1].count !== 0 ? d : ""
            //         );
            //         const posB = outerArc.centroid(
            //             d.data.data[1].count !== 0 ? d : ""
            //         );
            //         // const posC = outerArc.centroid(d);
            //         // const midangle =
            //         //     d.startAngle + (d.endAngle - d.startAngle) / 2;
            //         // posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1);
            //         return [posA, posB];
            //     });

            arc.append("text")
                .transition()
                .duration(1100)
                .ease(d3.easeLinear)
                .text((d) =>
                    d.data.data[1].count !== 0 ? d.data.data[1].count : ""
                )
                .attr("fill", (d) => colors(d.data.data[1].label))
                .attr("key", (d) => colors(d.data.data[1].label))
                .attr("transform", (d) => {
                    const pos = outerArc.centroid(
                        d.data.data[1].count !== 0 ? d : ""
                    );
                    // const midangle =
                    //     d.startAngle + (d.endAngle - d.startAngle) / 2;
                    // pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
                    return `translate(${pos})`;
                })
                .style("text-anchor", (d) => {
                    const midangle =
                        d.startAngle + (d.endAngle - d.startAngle) / 2;
                    return midangle < Math.PI ? "start" : "end";
                });

            svg.selectAll("mydots")
                .data(dataReady)
                .enter()
                .append("circle")
                .attr("cx", 135)
                .attr("cy", (d, i) => {
                    return i * 20;
                }) // 100 is where the first dot appears. 25 is the distance between dots
                .attr("r", 7)
                .style("fill", (d) => {
                    return colors(d.data[1].label);
                })
                .attr("key", (d) => colors(d.data[1].label));

            // Add one dot in the legend for each name.
            svg.selectAll("mylabels")
                .data(dataReady)
                .enter()
                .append("text")
                .attr("x", 150)
                .attr("y", (d, i) => {
                    return i * 20;
                }) // 100 is where the first dot appears. 25 is the distance between dots
                .style("fill", (d) => {
                    return colors(d.data[1].label);
                })
                .text((d) => {
                    return d.data[1].label;
                })
                .attr("text-anchor", "left")
                .style("alignment-baseline", "middle")
                .attr("key", (d) => colors(d.data[1].label));
        }

        if (donutExams && donutExams.length !== 0) {
            drawChart(390, 200);
        } else {
            drawChart(0, 0);
        }
    }, [donutExams]);

    console.log(donutExams.length);

    return (
        <Row>
            {/* {renderr} */}

            <Col span={24} id="pie-container">
                <svg />
            </Col>

            {donutExams.length === 0 && (
                <Col
                    span={24}
                    className={allComponentsStyle["donut-chart-col"]}
                >
                    <Empty
                        className={
                            allComponentsStyle["donut-chart-empty-position"]
                        }
                    />
                </Col>
            )}
        </Row>
    );
};

export default DonutChart;
