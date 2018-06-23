/*
 * Npm import
 */
import React from 'react';
import axios from 'axios';


/*
 * Local import
 */
import Currency from 'src/components/Currency';


/*
 * Code
 */
const API_KEY = 'bcb131e5341e154b786a5ac9955d0c4c';
const API_BASE_URL = 'http://data.fixer.io/api/';

class App extends React.Component {
  /**
   * État initial. Pour faire plaisir au JSX pendant le fetch API.
   */
  state = {
    currencies: [],
    amountFrom: '1',
    amountTo: '',
    currencyFrom: 'EUR',
    currencyTo: '',
  }

  componentDidMount() {
    const url = `${API_BASE_URL}/latest?access_key=${API_KEY}`;
    axios.get(url)
      .then(this.setData);
  }

  /**
   * Initialise l'état de départ à partir de l'API fixer.io
   */
  setData = (response) => {
    // récupération des données brutes de l'API
    const { base: currencyFrom, rates } = response.data;
    // extraction des devises
    const currencies = Object.keys(rates);
    // choix d'une monnaie-cible par défaut
    const currencyTo = currencies[10];
    // extraction du taux de conversion de base
    const rate = rates[currencyTo];
    // calcul du montant converti par défaut
    const amountTo = this.formatAmount(parseFloat(this.state.amountFrom) * rate);
    // écriture dans le state de base
    this.setState({
      currencyFrom, // 'EUR' par défaut car compte gratuit sur l'API fixer
      currencyTo,
      currencies,
      amountTo,
      rates,
    });
  }

  /**
   * Formattage des montants.
   * @param  {Number} rawAmount
   * @param  {Number} precision précision flottante pour l'arrondi
   * @return {String} montant arrondi à n chiffres après la virgule, sous forme
   *                  de chaîne de caractère
   */
  formatAmount = (rawAmount, precision = 2) => {
    // idée 1 : Math.round(rawAmount * 10000) / 10000
    // idée 2 : utiliser un logarithme (merci Google)
    const factor = 10 ** precision;
    const amount = Math.round(rawAmount * factor) / factor;
    return String(amount);
  }

  /**
   * Gestion du montant à convertir depuis un input.
   * @param  {String} context 'from' or 'to'
   */
  handleAmountChange = context => (evt) => {
    const newAmount = evt.target.value;
    if (context === 'from') {
      const otherAmount = parseFloat(newAmount) * this.state.rates[this.state.currencyTo];
      this.setState({
        amountFrom: this.formatAmount(newAmount),
        amountTo: this.formatAmount(otherAmount),
      });
    }
    else if (context === 'to') {
      const otherAmount = parseFloat(newAmount) / this.state.rates[this.state.currencyTo];
      this.setState({
        amountTo: this.formatAmount(newAmount),
        amountFrom: this.formatAmount(otherAmount),
      });
    }
  };

  /**
   * Gestion de la sélection d'une monnaie.
   * @param  {String} context 'from' or 'to'
   */
  handleCurrencyChange = context => (evt) => {
    const newCurrency = evt.target.value;
    if (context === 'from') {
      this.setState({
        currencyFrom: newCurrency,
      });
    }
    else if (context === 'to') {
      const newAmount = parseFloat(this.state.amountFrom) * this.state.rates[newCurrency];
      this.setState({
        currencyTo: newCurrency,
        amountTo: this.formatAmount(newAmount),
      });
    }
  };

  render() {
    const {
      currencyFrom,
      currencyTo,
      amountFrom,
      amountTo,
      currencies,
    } = this.state;
    const { handleAmountChange, handleCurrencyChange } = this;

    return (
      <div className="app">
        {/* Widget currency de base (monnaie et montant de départ / "from") */}
        <Currency
          currencies={currencies}
          currency={currencyFrom}
          onCurrencyChange={handleCurrencyChange('from')}
          onAmountChange={handleAmountChange('from')}
          amount={amountFrom}
        />

        <div className="app-arrow">🠃</div>

        {/* Widget currency d'arrivée ("to") */}
        <Currency
          currencies={currencies}
          currency={currencyTo}
          onCurrencyChange={handleCurrencyChange('to')}
          onAmountChange={handleAmountChange('to')}
          amount={amountTo}
        />
      </div>
    );
  }
}

export default App;
