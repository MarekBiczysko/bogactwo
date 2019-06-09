import React from 'react';
import {Container, Row} from 'reactstrap';
import ChartContainer from "./ChartContainer";
import connect from "react-redux/es/connect/connect";

class ChartsContainer extends React.Component {

  createChildren = (selected) => {
    return Object.keys(selected).map((key) => {
      return (
        <div
          key={selected[key]}
          className={'my-2 mx-2 px-2 py-2 border rounded border-info flex-chart-item'}
        >
          <ChartContainer currency={selected[key]}/>
        </div>
      )
    });
  };

  render() {
    const {selected} = this.props;

    return (
      <Container>
        <Row className={'mt-2 justify-content-center'}>
          {
            selected.length
              ? <div className={'flex-chart-container'}>{this.createChildren(selected)}</div>
              : <div className={'my-5'}>Please select market</div>}
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  selected: state.selected,
});

export default connect(mapStateToProps)(ChartsContainer);
