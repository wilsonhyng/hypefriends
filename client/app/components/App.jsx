import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import AwesomeComponent from './AwesomeComponent.jsx';
import GetAPI from './GetAPI.jsx';

import AddFriend from './AddFriend.jsx';
// import DisplayFriends from './DisplayFriends.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: []
    };
  }

  componentDidMount() {
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
        this.setState({friends: friendsString});
      });
  }


  // componentWillReceiveProps()

  updateFriends(newFriends) {
    this.setState({
      friends: newFriends
    });
  }

  render () {
    return (
      <div className='row'>
      
        <div className='col-xs-4'>
          <img id='hypemlogo' src='../hypem.png'></img>
        </div>

        <div className='col-xs-4'>
          <h1>HypeFriends</h1>
        </div>


        <div className='col-xs-4'>
          <h3>Friends</h3>
          <div className='text-center friends'>
            {this.state.friends.map(friend => 
                  <div className='eachFriend'>{friend}</div>)
              }
          </div>
        </div>


        <div id='addFriend'>
          <AddFriend 
          friends={this.state.friends}
          updateFriends={this.updateFriends.bind(this)}
          />
        </div>

      </div>
    );
  }
}

export default App;