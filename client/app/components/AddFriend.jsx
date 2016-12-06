import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class AddFriend extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      favorites: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    // console.log(this.state.value);
    axios.post('/addFriend', {
      data: (this.state.value).toLowerCase()
    })
    .then((response) => {
      console.log('THE END REPONSE', response);
      if (response.data !== 'error') {
        const favorites = response.data;
        this.setState({ favorites });
      }
    })
    .catch((error) => {
      console.log(error);
      this.setState({value: ''});
    });
    this.setState({value: ''});
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Username:
            <input name="friend" type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      

        <div>
        <h2>Favorites from {this.state.value}</h2>
          <ul>
            {this.state.favorites !== 'error' &&
              this.state.favorites.map(favorite => 
                <li>{favorite.artist} - {favorite.title}</li> 
                )
            }
          </ul>
        </div>
      </div>

    );
  }
}

export default AddFriend;