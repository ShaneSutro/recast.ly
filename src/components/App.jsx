import Search from './Search.js';
import VideoPlayer from './VideoPlayer.js';
import VideoList from './VideoList.js';
import {beginningState} from '../data/exampleVideoData.js';
import YOUTUBE_API_KEY from '../config/youtube.js';



class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: beginningState,
      currentVideo: beginningState[0]
    };
  }

  chooseVideo(video) {
    this.setState((state) => ({
      currentVideo: video,
    }));
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <Search/>
          </div>
        </nav>
        <div className="row">
          <div className="col-md-7">
            <VideoPlayer video={this.state.currentVideo}/>
          </div>
          <div className="col-md-5">
            <VideoList videos={this.state.videos} chooseVideo={this.chooseVideo.bind(this)}/>
          </div>
        </div>
      </div>
    );
  }
  // componentDidMount gets run seccond after the DOM is rendereded.
  // because searchYouTube function takes in thee VERY IMPORTANT options object.
  // we made our options object inside of componentDidMount and pass it into this.props.search
  // and we set tom adn jerry as our first initial load up search when you turn the app on.
  componentDidMount() {
    var options = {
      query: 'pyramids built by aliens',
      max: 5,
      key: YOUTUBE_API_KEY
    };
    //props.search is passed from an import of index.js '<App search={searchYouTube}'
    //props.search contains the whole searchYouTube function.
    this.props.searchYouTube(options, (videoData) => {
      this.setState((state) => ({
        videos: videoData,
        currentVideo: videoData[0],
      }));
    });
  }
}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default App;
