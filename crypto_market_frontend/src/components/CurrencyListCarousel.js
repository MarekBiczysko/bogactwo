import React from 'react';

import ItemsCarousel from 'react-items-carousel';
import {isEqual} from "lodash";
import CurrencyListCarouselButton from "./CurrencyListCarouselButton";
import connect from "react-redux/es/connect/connect";
import {setSelected} from "../actions";

const shallowCompare = (obj1, obj2) => {
  return (Object.keys(obj1).length === Object.keys(obj2).length &&
  Object.keys(obj1).every(key => obj1[key] === obj2[key]))
};

class CurrencyListCarousel extends React.Component {

  shouldComponentUpdate(nextProps) {
    const selectedChanged = !isEqual(this.props.selected, nextProps.selected);
    const currencyListChanged = !shallowCompare(this.props.currencyList, nextProps.currencyList);

    return selectedChanged || currencyListChanged;
  }

  toggleSelected = (e) => {
    const key = e.target.id;
    const index = this.props.selected.indexOf(key);

    if (index >= 0) {
      let filteredArray = this.props.selected.filter(item => item !== key);
      this.props.setSelected(filteredArray);
    } else {
      let newArray = [key].concat(this.props.selected);
      this.props.setSelected(newArray);
    }
  };

  isSelected = (key) => {
    return this.props.selected.indexOf(key) >= 0;
  };

  createChildren = () => {
    const items = this.props.currencyList;
    const isSelected = this.isSelected;

    return Object.keys(items).map( (key) => {
      return (
        <CurrencyListCarouselButton
          selected={isSelected(key)}
          key={key}
          text={key}
          hoverText={items[key]}
          callback={this.toggleSelected}
        />
      )
    });
  };

  render() {
    return (
      <React.Fragment>
        <ItemsCarousel
          // Carousel configurations
          numberOfCards={6}
          gutter={12}
          showSlither={true}
          firstAndLastGutter={true}
          freeScrolling={true}
        >
          {this.props.selected && this.createChildren()}
        </ItemsCarousel>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  selected: state.selected,
});

export default connect(mapStateToProps, {setSelected})(CurrencyListCarousel);
