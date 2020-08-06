import moment from 'moment';
import React from "react";
import { DateFilter, OptionsFilter } from '../components';

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
      
      document.location.reload(true);
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

  export default Filters;