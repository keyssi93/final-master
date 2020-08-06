import React from "react";

export default  class Hotels extends React.Component {
 
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