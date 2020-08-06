
import React from "react";

export default class Hero extends React.Component {
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