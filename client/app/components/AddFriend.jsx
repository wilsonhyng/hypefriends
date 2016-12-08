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
    axios.post('/addFriend', {
      data: (this.state.value).toLowerCase()
    })
    .then((response) => {
      if (response.data !== 'error') {
        const favorites = response.data;
        this.setState({ favorites });
        let displayFriend = this.state.value; 
        this.setState({currentFriend: displayFriend});

        axios.post('/displayFriends')
          .then((response) => {
            const friends = response.data;
            let keys = Object.keys(response.data);
            let friendArray = [];
            let friendsString = [];
            for (var i = 0; i < keys.length; i++) {
              friendArray.push(response.data[keys[i]]);
            }
            for (var j = 0; j < friendArray.length; j++) {
              friendsString.push(friendArray[j].friend);
            }
            return friendsString;
          })
          .then((friendsString) => {
            this.props.updateFriends(friendsString);
          });
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
      
        <h3 className='dynamicFriend'>Favorites from <span>{this.state.value} {this.state.currentFriend}</span></h3>

          <div className='renderedFavs'>
            {this.state.favorites !== 'error' &&
              this.state.favorites.map((favorite, index) => 
                <div className='text-center eachFav' key={index}>

                  <a target='_blank' href={favorite.posturl}>{favorite.artist} - {favorite.title}</a>

                  <img src={favorite['thumb_url_large']}></img>

                </div>
                )}
          </div>


      </div>
    );
  }
}

export default AddFriend;