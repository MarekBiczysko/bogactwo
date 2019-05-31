import React from 'react';
import {Spinner} from 'reactstrap';
import {addCurrencyDataFetchTask} from "../api";
import Chart from './Chart'

export default class ChartContainer extends React.Component {
  constructor(props) {
    super(props);

    this.startTaskCurrencyData = this.startTaskCurrencyData.bind(this);

    const currentDataset = {
      type: "line",
      label: 'Latest value',
      backgroundColor: "rgba(0, 0, 0, 0)",
      borderColor: 'green',
      pointBackgroundColor: 'green',
      pointBorderColor: 'green',
      borderWidth: "3",
      lineTension: 0.1,
      data: []
    };

    const lowDataset = {
      ...currentDataset,
      label: 'Lowest value',
      borderColor: 'orange',
      pointBackgroundColor: 'orange',
      pointBorderColor: 'orange',
      borderWidth: "2",
      data: []
    };

    const highDataset = {
      ...currentDataset,
      label: 'Highest value',
      borderColor: 'aqua',
      pointBackgroundColor: 'aqua',
      pointBorderColor: 'aqua',
      borderWidth: "2",
      data: []
    };

    this.state = {
      fetched: false,
      chartData: {
        labels: [],
        datasets: [
          currentDataset,
          lowDataset,
          highDataset,
        ],
      },
    };
  }

  chartOptions = {
    title: {
      text: `USD-${this.props.currency}`,
      display: true,
    },
    responsive: true,
    maintainAspectRatio: true,
    tooltips: {
      enabled: true
    },
    scales: {
      xAxes: [
        {
          ticks: {
            autoSkip: true,
            maxTicksLimit: 10
          }
        }
      ]
    }
  };

  componentDidMount() {
    this.startTaskCurrencyData(this.props.currency);

    this.ws = new WebSocket(`ws://localhost:8000/ws/currency_data/${this.props.currency}`);

    this.ws.onmessage = e => {

      const parsedData = JSON.parse(e.data);

      const newCurrentDataSet = {...this.state.chartData.datasets[0]};
      newCurrentDataSet.data.push(parsedData.last);
      const newLowDataSet = {...this.state.chartData.datasets[1]};
      newLowDataSet.data.push(parsedData.low);
      const newHighDataSet = {...this.state.chartData.datasets[2]};
      newHighDataSet.data.push(parsedData.high);

      const newChartData = {
        ...this.state.chartData,
        datasets: [newCurrentDataSet, newLowDataSet, newHighDataSet],
        labels: this.state.chartData.labels.concat(parsedData.timestamp)
      };

      this.setState({
        chartData: newChartData,
        fetched: true
      });
    };
  }

  componentWillUnmount() {
    this.ws.close();
  }

  async startTaskCurrencyData() {
    await addCurrencyDataFetchTask(this.props.currency);
  }

    componentDidUpdate() {
    }
  render() {
    return (
      <React.Fragment>
        <p>{this.props.currency}</p>
        {
          this.state.fetched ?
            <Chart
              data={this.state.chartData}
              options={this.chartOptions}
            />
            : <Spinner/>}
      </React.Fragment>
    )
  }
}
