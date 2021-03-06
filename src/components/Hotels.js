import React from "react";
import  Hotel  from './Hotel';

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

  export default Hotels;