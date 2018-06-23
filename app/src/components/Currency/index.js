/**
 * Import npm
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Code
 */
const Currency = ({
  currency,
  onCurrencyChange,
  currencies,
  onAmountChange,
  amount,
}) => {
  return (
    <div className="app-currency">
      <select
        value={currency}
        onChange={onCurrencyChange}
      >
        {
          currencies.map(cur => (
            <option key={cur} value={cur}>{cur}</option>
          ))
        }
      </select>
      <input
        type="text"
        value={amount}
        onChange={onAmountChange}
      />
    </div>
  );
};

Currency.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  currency: PropTypes.string.isRequired,
  onCurrencyChange: PropTypes.func.isRequired,
  amount: PropTypes.string.isRequired,
  onAmountChange: PropTypes.func.isRequired,
};

export default Currency;
