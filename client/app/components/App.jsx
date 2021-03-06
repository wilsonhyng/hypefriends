import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import AddFriend from './AddFriend.jsx';

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

  updateFriends(newFriends) {
    this.setState({
      friends: newFriends
    });
  }

  render () {
    return (

      <div className='container'>

        <div className='row'>
        
          <div className='col-xs-4 vcenter'>
            <img id='hypemlogo' src='../hypem.png'></img>
          </div>

          <div className='col-xs-4 vcenter'>
            <h1>HYPE<span>Friends</span></h1>
          </div>


          <div className='col-xs-4 vcenter friends'>
            <h3>Friends</h3>
            <div className='text-center'>
              {this.state.friends.map(friend => 
                    <div className='eachFriend'>{friend}</div>
              )}
            </div>
          </div>

        </div>


        <div id='addFriend'>
          <AddFriend 
          updateFriends={this.updateFriends.bind(this)}
          />
        </div>


      </div>
    );
  }
}

export default App;