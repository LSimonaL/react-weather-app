import React, { Component } from 'react';
import './App.css';
import WeekContainer from './components/WeekContainer';
import Weather from './components/Weather';
import Form from "./components/Form";
import {API_KEY} from "./components/config/apiKey";
import {
  BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

class App extends Component {
  constructor() {
    super();
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      description: "",
      error: false
    };
  }


  calCelsius(temp) {
    let cell = Math.floor(temp - 273.15);
    return cell;
  }


  getWeather = async e => {
    e.preventDefault();

    const country = e.target.elements.country.value;
    const city = e.target.elements.city.value;

    if (country && city) {
      const api_call = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`
      );

      const response = await api_call.json();

      this.setState({
        city: `${response.name}, ${response.sys.country}`,
        country: response.sys.country,
        main: response.weather[0].main,
        celsius: this.calCelsius(response.main.temp),
        description: response.weather[0].description,
        error: false
      });
      console.log(response);
    } else {
      this.setState({
        error: true
      });
    }
  };

  render() {
    return (
      <Router>

      <div className="App">

        <nav className="navbar navbar-expand-lg navbar-light shadow bg-light">
          <Link className="nav-link navbar-brand logo" to="/">Weather Today</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
          
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/WeekContainer">Local Forecast</Link>
              </li>
            </ul>
          </div>
        </nav>

        
        
        <Switch>

          <Route exact path="/">

          <Form loadweather={this.getWeather} error={this.state.error} />
              <Weather
                cityname={this.state.city}
                temp_celsius={this.state.celsius}
                description={this.state.description}
              />
          </Route>

          <Route path="/WeekContainer" component={(props) => <WeekContainer {...props}/> }/>

        </Switch>

        <footer id="sticky-footer" className="py-2 bg-light text-dark">
          <div className="container text-center">
            <small>&copy; WeatherToday</small>
          </div>
        </footer>
        
      </div>

      </Router>
    );
  }
}

export default App;