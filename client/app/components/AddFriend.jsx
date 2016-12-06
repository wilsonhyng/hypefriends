import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class AddFriend extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      favorites: [],
      currentFriend: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    this.setState({currentFriend: ''});
  }

  handleSubmit(event) {
    // console.log(this.state.value);
    axios.post('/addFriend', {
      data: (this.state.value).toLowerCase()
    })
    .then((response) => {
      // console.log('THE END REPONSE', response);
      if (response.data !== 'error') {
        const favorites = response.data;
        this.setState({ favorites });
        let displayFriend = this.state.value; 
        console.log(displayFriend);
        this.setState({currentFriend: displayFriend});
      }
    })
    .then (()=> {
      this.setState({value: ''});
    })
    .catch((error) => {
      console.log(error);
      this.setState({value: ''});
    });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Your HYPE friend:
            <input name="friend" type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      

        <div>
        <h3>Favorites from {this.state.value} {this.state.currentFriend}</h3>
          <div>
            {this.state.favorites !== 'error' &&
              this.state.favorites.map(favorite => 
                <div className='text-center'>

                <a target='_blank' href={favorite.posturl}>{favorite.artist} - {favorite.title}</a>

                <img src={favorite['thumb_url_large']}></img>

                </div>
                )
            }
          </div>
        </div>
      </div>

    );
  }
}

export default AddFriend;