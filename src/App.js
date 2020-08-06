import moment from 'moment';
import React, { Fragment } from "react";
import {Hero} from './components/Hero';
import {Filters} from './components/Filters';
import {Hotels} from './components/Hotels';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: {
        dateFrom: moment(new Date()),
        dateTo: moment()
          .add(1, "month"),
        country: '',
        price: '',
        rooms: ''
      },
      hotels: [],
      filteredHotels: [],
      isAllLoaded: false
    };
    this.handleFilterChange = this.handleFilterChange.bind(this)
    
  }


  
  componentDidMount() {
    fetch('https://wt-8a099f3e7c73b2d17f4e018b6cfd6131-0.sandbox.auth0-extend.com/acamica')
            .then(hotels => hotels.json())
            .then(hotels => this.setState({ hotels: hotels, isAllLoaded: true, filteredHotels: hotels }))
            .catch(() => console.log('Error en la petición...'));
  }
  warning() {
    return (
      <article className="message is-warning">
        <div className="message-body">
          No se han encontrado hoteles con los criterios definidos
        </div>
      </article>
    );
  }
  filterHotels(filters,hotels) {
    const { dateFrom, dateTo, country, price, rooms} = this.state.filters;
    return hotels.filter(hotel => {
       return moment(hotel.availabilityFrom) >= dateFrom &&
             moment(hotel.availabilityTo) <= dateTo &&
             hotel.rooms <= (rooms !== '' ? rooms : hotel.rooms) &&
             hotel.price <=(price !== '' ? parseInt(price) : hotel.price) &&
             hotel.country.trim().toLowerCase() === (country !== '' ? country.trim().toLowerCase() : hotel.country.trim().toLowerCase())
   })
  }

handleFilterChange(payload) {
  const newFilteredHotels = this.filterHotels(payload, this.state.hotels);
  console.log(newFilteredHotels);
  this.setState({
    filters: payload,
    filteredHotels: newFilteredHotels
  });
}
 

  render() {
    console.log('API de Hoteles: ', this.state.filteredHotels)
    return (
      <Fragment>
        <Hero filters={this.state.filters} />
        <Filters filters={this.state.filters} onFilterChange={this.handleFilterChange} />
        {this.state.isAllLoaded ? (
           <Hotels hotels={this.state.filteredHotels} />
        ) : (
          this.warning()
        )}
      </Fragment>
    );
  }
}

export default App;