//import {today,hotelsData} from './data.js';
import moment from 'moment';
import React, { Fragment } from "react";

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
class Hero extends React.Component {
  render(){
  const formato = {weekday: "long",
  year: "numeric", 
  month: "long", 
  day: "numeric", 
}
  return (
    <section className="hero is-primary">
    <div className="hero-body">
      <div className="container">
        <h1 className="title">Hoteles</h1>
        <h2 className="subtitle">
        desde el <strong onChange={this.handledatechange}>{this.props.filters.dateFrom.toLocaleString("es-ES", formato)}</strong> hasta el <strong>{this.props.filters.dateTo.toLocaleString("es-ES", formato)}</strong>
        </h2> 
      </div>
    </div>
  </section>
  )
}}
class DateFilter extends React.Component {
    constructor(props){super(props)
    this.handledatechange =this.handledatechange.bind(this)}

    handledatechange(event){
    this.props.onDateChange(event)}

    render(){
    return(
      <div className="field">
      <input className="input" type="date" onChange={this.handledatechange} value={this.date} name={this.props.name} />
      <div className="control has-icons-left">
      <span className="icon is-small is-left">
      <i className={ `fas fa-${this.props.icon}` }></i>
      </span>
      </div>
      </div>
      )
    }
}
class OptionsFilter extends React.Component { 
  constructor(props) {
    super(props)
    this.handleOptionChange = this.handleOptionChange.bind(this)
  }

  handleOptionChange(event) {
    this.props.onOptionChange(event)
  }

  render() { 
   
  return(
    <div className="field">
    <div className="control has-icons-left">
    <div className="select" style={ {width: '100%'} }>
    <select
      style={ {width: '100%'} }
      value={ this.props.selected }
      onChange={ this.handleOptionChange }
      name={ this.props.name}
      >
        {this.props.options.map(option=>{
        return(
        <option key={option.name} value={option.value}>
          {option.name}
        </option>
        )
        })}   
    </select>
    </div>
    <div className="icon is-small is-left">
    <i className={`fas fa-${this.props.icon}`}></i>
    </div>
    </div>
    </div>
    )
  }
}
class Filters extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      username: 'foo'
    }
    this.handleOptionChange = this.handleOptionChange.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleOptionChange(event) {
    let payload = this.props.filters
    payload[event.target.name] = event.target.value
  
    this.props.onFilterChange(payload)
  }

  handleDateChange(event) {
    let payload = this.props.filters
    const { target: { name, value } } = event
    payload[name] = moment(value).isValid() ? moment(value).toDate() : ''

    if (moment(payload.dateTo).isSameOrBefore(payload.dateFrom)) {
      alert('La fecha de salida sebe ser posterior a la fecha de entrada')
    } else {
      this.props.onFilterChange(payload)
    }
  }

  handleClick(event) {
    this.setState({ username: '' })
  }

  render(){
    const { username } = this.state
    return (
      <nav  className="navbar is-info" style={ {justifyContent: 'center'} }>
        <div className="navbar-item">
          <DateFilter
            date={ this.props.filters.dateFrom }
            icon="sign-in-alt"
            onDateChange={ this.handleDateChange }
            name="dateFrom"
          />
        </div>
        <div className="navbar-item">
          <DateFilter
            date={ this.props.filters.dateTo }
            icon="sign-out-alt"
            onDateChange={ this.handleDateChange }
            name="dateTo"
          />
        </div>
        <div className="navbar-item">
          <OptionsFilter
            options={ [ {value: {username}, name: 'Todos los países'}, {value: 'Argentina', name: 'Argentina'}, {value: 'Brasil', name: 'Brasil'}, {value: 'Chile', name: 'Chile'}, {value: 'Uruguay', name: 'Uruguay'} ] }
            selected={ this.props.filters.country }
            icon="globe"
            onOptionChange={ this.handleOptionChange }
            name="country"
          />
        </div>
        <div className="navbar-item">
          <OptionsFilter
            options={ [ {value: '', name: 'Cualquier precio'}, {value: 1, name: '$'}, {value: 2, name: '$$'}, {value: 3, name: '$$$'}, {value: 4, name: '$$$$'} ] }
            selected={ this.props.filters.price }
            icon="dollar-sign"
            onOptionChange={ this.handleOptionChange }
            name="price"
          />
        </div>
        <div className="navbar-item">
          <OptionsFilter
            options={ [ {value: '', name: 'Cualquier tamaño'}, {value: 10, name: 'Hotel pequeño'}, {value: 20, name: 'Hotel mediano'}, {value: 30, name: 'Hotel grande'} ] }
            selected={ this.props.filters.rooms }
            icon="bed"
            onOptionChange={ this.handleOptionChange }
            name="rooms"
          />
        </div>
        <div className="navbar-item">
        <input className="button" type="reset" value="Limpiar" onClick={this.handleClick} ></input>
        </div>
       
      </nav>
    )
  }
}
class Hotel extends React.Component {
  constructor(props) {
    super(props)
    this.handleClickAction = this.handleClickAction.bind(this)
  }

  handleClickAction() {
    this.props.handleAction || alert('No implementamos esto aún :(')
  }
  
   render(){
    const { data } = this.props;
  return (
      <div className="card">
      <div className="card-image">
      <figure className="image is-4by3">
      <img src={data.photo} alt={data.name} />
      </figure>
      </div>

      <div className="card-content">
      <p className="title is-4">{data.name}</p>
      <p>{data.description}</p>

      <div className="field is-grouped is-grouped-multiline" style={{marginTop: '1em'}}>
      <div className="control">
      <div className="tags has-addons">
          <span className="tag is-medium is-info"><i className="fas fa-map-marker"></i></span>
          <span className="tag is-medium">{data.city}, {data.country} </span>
        </div>
      </div>
      
      <div className="control">
      <div className="tags has-addons">
          <span className="tag is-medium is-info"><i className="fas fa-bed"></i></span>
          <span className="tag is-medium">{data.rooms} Habitaciones</span>
        </div>
      </div>
      
      <div className="control">
       <div className="tags">
        <span className="tag is-medium is-info">
          {[1,2,3,4].map(value => (
                <i key={value} className="fas fa-dollar-sign" style={{margin: '0 .125em', opacity: value > this.props.data.price ? '.25' : '1'}}></i>
              ))}
          </span>
        </div>
      </div>
      </div>
    </div>
  
  <div className="card-footer"> 
  <a href="#!"
    onClick={this.handleClickAction}
    className="card-footer-item has-background-primary has-text-white has-text-weight-bold">
     Reservar</a></div>
</div>
 
  )
}}

class Hotels extends React.Component {
 
  render(){
    const data = this.props.hotels;
  return (

    <section className="section" style={ {marginTop: '3em'} }>
          <div className="container">
          <div className="columns is-multiline">
            {
            data.map((hotels) => {
              return(
              <div key={hotels.slug } className="column is-one-third">
              <Hotel  data={ hotels} />
              </div>
            )}
            )}
        </div>
      </div>
    </section>
  )
  }
}
export default App;