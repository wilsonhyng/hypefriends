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
        // console.log(displayFriend);
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

            // let friendState = this.props.friends;
            // this.setState({friends: friendString});
            // this.setState({friendState: friendsString});
            // this.props.updateFriends(friendString);
            // console.log(this.props.updateFriends);

            // console.log(friendState);
            // console.log(this.props.friends);

            // this.props.updateFriends();
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
      <div className='row'>
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
                <div className='text-center eachFav'>

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