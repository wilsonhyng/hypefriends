import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import AwesomeComponent from './AwesomeComponent.jsx';
import GetAPI from './GetAPI.jsx';

import AddFriend from './AddFriend.jsx';
import DisplayFriends from './DisplayFriends.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: []
    };
  }

  componentDidMount() {
    axios.post('/displayFriends')
    // see how you can pass in a user generated username
      .then((response) => {
        const friends = response.data;
        console.log(friends);
        let keys = Object.keys(response.data);
        let friendArray = [];
        let friendsString = [];
        for (var i = 0; i < keys.length; i++) {
          friendArray.push(response.data[keys[i]]);
        }
        for (var j = 0; j < friendArray.length; j++) {
          friendsString.push(friendArray[j].friend);
        }

        this.setState({friends: friendsString});


        // this.setState({ friends });
        // // console.log(this.state.friends);
        console.log(this.state.friends);
      });
  }

  render () {
    return (
      <div>

      <h1>HypeFriends</h1>

      <div id='friends'>
        <h3>Friends</h3>
        <div>
          {this.state.friends.map(friend => 
                <div>{friend}</div>)
            }
        </div>
      </div>


      <div id='addFriend'>
        <AddFriend />
      </div>

      </div>
    );
  }
}

export default App;