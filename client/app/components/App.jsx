import React from 'react';
import ReactDOM from 'react-dom';


import AwesomeComponent from './AwesomeComponent.jsx';
import GetAPI from './GetAPI.jsx';
import AddFriend from './AddFriend.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // componentDidMount() {
  //   this.getFriend('react tutorials');
  // }

  // getFriend(query) {

  // }


  //   getYouTubeVideos(query) {
  //   var options = {
  //     key: this.props.API_KEY,
  //     query: query
  //   };

  //   this.props.searchYouTube(options, (videos) =>
  //     this.setState({
  //       videos: videos,
  //       currentVideo: videos[0]
  //     })
  //   );
  // }

  render () {
    return (
      <div>
      <h1>HypeFriends</h1>

      <div>
        <AddFriend />
      </div>

      </div>
    );
  }
}

export default App;