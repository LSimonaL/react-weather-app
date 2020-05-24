import React from 'react';
import {API_KEY} from './config/apiKey';
import DayCard from './Day';

class WeekContainer extends React.Component {

  state = {
    fullData: [],
    dailyData: [],
    degreeType: "celsius"
  }

  updateForecastDegree = event => {
    this.setState({
      degreeType: event.target.value
    }, () => console.log(this.state))
  }

  componentDidMount = () => {
    const weatherURL =
    `http://api.openweathermap.org/data/2.5/forecast?q=Copenhagen&zip=11102&units=metric&APPID=${API_KEY}`
  
    fetch(weatherURL)
    .then(res => res.json())
    .then(data => {
      const dailyData = data.list.filter(reading => reading.dt_txt.includes("18:00:00"))
      this.setState({
        fullData: data.list,
        dailyData: dailyData
      }, () => console.log(this.state))
    })
  }


  formatDayCards = () => {
    return this.state.dailyData.map((reading, index) => <DayCard reading={reading} key={index} />)
  }


  render() {
    return (
      <div className="container">
      <h3 className="display-3 mt-4 mb-5 text-muted">Copenhagen, Denmark</h3>
        <div className="row justify-content-center weekcountainer mt-3">
          {this.formatDayCards()}
        </div>               
      </div>     
    )
    
  }
}

export default WeekContainer;