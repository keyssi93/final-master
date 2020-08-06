import React from "react";

export default  class DateFilter extends React.Component {
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