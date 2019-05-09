import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';
import MovieCreate from './Movies/MovieCreate';
import './index.css';

export default class App extends Component {
  constructor(){
    super()
    this.state = {
      savedList: []
    }
  }

  addToSavedList = movie => {
    const savedList = this.state.savedList;
    //return true if any of the element meet the condition
    if(savedList.some(elem => elem.id === movie.id)) {
      return;
    } else {
      savedList.push(movie);
    }
    this.setState({ savedList });
};

  render(){
    return (
      <div>
        <SavedList list={this.state.savedList} />
        <Route exact path="/" component={MovieList} />
        <Route path="/movies/list/:id" render={ (props) => {
          return(<Movie {...props} addToSavedList={this.addToSavedList}/>)
        }} />
        <Route path="/movies/add" render={(props) => {
          return(<MovieCreate {...props} />)
        }}
        />
      </div>
    )
  }
}
