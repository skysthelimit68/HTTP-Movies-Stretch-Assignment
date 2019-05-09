import React from 'react';
import axios from 'axios';

class MovieCreate extends React.Component {
    constructor(){
        super();
        this.state={
            title: "",
            director:"",
            metascore:"",
            star:"", 
            stars:[]

        }
    }

    inputChange = event => {
        event.preventDefault();
        this.setState({
            [event.target.name] : event.target.value,
        })
    }

    addStarToList = event => {
        event.preventDefault();
        let newStars = this.state.stars;
        if(this.state.star !== "") newStars.push(this.state.star)
        this.setState({
            stars: newStars,
            star: ""
        })
    }

    addMovie = event => {
        event.preventDefault();
        if(this.state.star !== "") this.addStarToList();
        axios.post('http://localhost:5000/api/movies', {
            title: this.state.title,
            director: this.state.director,
            metascore: this.state.metascore,
            stars: this.state.stars
          })
          .then(function (response) {
            console.log(response);
            this.setState({
                title:"",
                director:"",
                metascore: null,
                stars:[]
            })
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    render() {
        return(
            <div>
                <form>
                    <input 
                        type="text"
                        placeholder="title"
                        name="title"
                        onChange = {this.inputChange}
                        value={this.state.title}
                    />
                    <input 
                        type="text"
                        placeholder="director"
                        name="director"
                        onChange = {this.inputChange}
                        value={this.state.director}
                    />
                    <input 
                        type="number"
                        placeholder="metascore"
                        name="metascore"
                        onChange = {this.inputChange}
                        value={this.state.metascore}
                    />
                    <input 
                        type="text"
                        placeholder={this.state.stars.length === 0? "add star one at a time" : `${this.state.stars.length} stars already added`}
                        name="star"
                        onChange = {this.inputChange}
                        value={this.state.star}
                    />
                    <button onClick={this.addStarToList}>Add Star</button>
                    <button onClick={this.addMovie}>Add Movie</button>
                </form>
            </div>
        )
    }
   
        
}

export default MovieCreate;


