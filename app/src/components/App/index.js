/*
 * NPM import
 */
import React from 'react';
import axios from 'axios';
// import { Line } from 'react-chartjs-2'
/*
 * Local import
 */

/*
 * Code
 */
const API_BASE_URL = 'http://data.fixer.io/api/timeseries';
const API_KEY = '?access_key=d5ba8ce464430c530712afb3334228ad';
const ENDPOINT = '&start_date=2018-04-03&end_date=2018-05-03';
const SYMBOLS = '&symbols=EUR,SAR,GBP,USD,CAD';

class App extends React.Component {
  state = {}
  /*
   * Connexion à l'API Fixer
   */
  componentDidMount() {
    const url = `${API_BASE_URL}${API_KEY}${ENDPOINT}${SYMBOLS}`;
    axios.get(url)
      .then(this.setData);
  }

  /*
   * Initialise le state à partir de l'API
   */
  setData = (response) => {
    console.log(response.data);
  }

  /*
   * Rendu
   */
  render() {
    return (
      <div id="app">Taux de change des 30 derniers jours</div>
    );
  }
}


/*
 * Export
 */
export default App;
