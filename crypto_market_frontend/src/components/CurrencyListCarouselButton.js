import React from 'react';
import ReactTooltip from 'react-tooltip'

const CurrencyListCarouselButton = ({selected, text, hoverText, callback}) => (
  <React.Fragment>
    <a data-tip data-for={`id_${text}`}>
      <div
        className={'currencyButton ' + (selected ? 'currencyButtonOn' : 'currencyButtonOff')}
        id={text}
        onClick={callback}>
        {text}
      </div>
    </a>
    <ReactTooltip id={`id_${text}`} type='dark' place='bottom' effect='solid' offset={{bottom: 20}}>
      {hoverText}
    </ReactTooltip>
  </React.Fragment>
);

export default CurrencyListCarouselButton;
