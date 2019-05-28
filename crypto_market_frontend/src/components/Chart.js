import React from "react";
import { Line } from "react-chartjs-2";

const Chart = props => <Line width={200} height={100} data={props.data} options={props.options} />;

export default Chart;
