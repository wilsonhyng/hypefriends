import React from 'react';
import ReactDOM from 'react-dom';


import AwesomeComponent from './AwesomeComponent.jsx';
import GetAPI from './GetAPI.jsx';

import AddFriend from './AddFriend.jsx';
import DisplayFriends from './DisplayFriends.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <div>
      <h1>HypeFriends</h1>

      <div>
        <AddFriend />
      </div>

      <div>
        <DisplayFriends />
      </div>

      </div>
    );
  }
}

export default App;