import React from 'react';

import ItemsCarousel from 'react-items-carousel';
import {isEqual} from "lodash";
import CurrencyListCarouselButton from "./CurrencyListCarouselButton";

const shallowCompare = (obj1, obj2) => {
  return (Object.keys(obj1).length === Object.keys(obj2).length &&
  Object.keys(obj1).every(key => obj1[key] === obj2[key]))
};

export default class CurrencyListCarousel extends React.Component {
  constructor(props) {
    super(props);

    this.toggleSelected = this.toggleSelected.bind(this);
    this.isSelected = this.isSelected.bind(this);

    this.state = {
      selected: [],
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const selectedChanged = !isEqual(this.state.selected, nextState.selected);
    const currencyListChanged = !shallowCompare(this.props.currencyList, nextProps.currencyList);
    return selectedChanged || currencyListChanged;
  }

  toggleSelected(e) {
    console.log('toggle selected', e.target.id);
    const key = e.target.id;
    const index = this.state.selected.indexOf(key);

    if (index >= 0) {
      this.setState((prevState) => {
        let filteredArray = prevState.selected.filter(item => item !== key);
        this.props.updateGlobalSelected(filteredArray);
        return {selected: filteredArray};
      });
    } else {
      this.setState((prevState) => {
        let newArray = prevState.selected.concat(key);
        this.props.updateGlobalSelected(newArray);
        return {selected: newArray};
      });
    }
  }

  isSelected(key) {
    return this.state.selected.indexOf(key) >= 0;
  }

  createChildren = () => {

    const items = this.props.currencyList;
    const isSelected = this.isSelected;
    const toggleCallback = this.toggleSelected;

    return Object.keys(items).map(function (key) {
      return (
        <CurrencyListCarouselButton
          selected={isSelected(key)}
          key={key}
          text={key}
          hoverText={items[key]}
          callback={toggleCallback}
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
          {this.createChildren()}
        </ItemsCarousel>
      </React.Fragment>
    )
  }
}
