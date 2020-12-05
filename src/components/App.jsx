import Search from './Search.js';
import VideoPlayer from './VideoPlayer.js';
import VideoList from './VideoList.js';
import {beginningState} from '../data/exampleVideoData.js';
import YOUTUBE_API_KEY from '../config/youtube.js';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.timedOut = null;
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

  debounce(func, wait, immediate) {
    console.log('Debouncing...');
    var timeout;
    return function() {
      var context = this;
      var args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) {
          console.log('Calling function');
          func.apply(context, args);
        }
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) {
        func.apply(context, args);
      }
    };
  }

  searchForVideos(queryString) {
    console.warn(queryString);
    var options = {
      query: queryString,
      max: 5,
      key: YOUTUBE_API_KEY
    };
    this.props.searchYouTube(options, (videoData) => {
      this.setState((state) => ({
        videos: videoData,
        currentVideo: videoData[0],
      }));
    });
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            {/* <Search searchForVideo = {this.searchForVideos.bind(this)}/> */}
            <Search searchForVideo={this.debounce(function (queryString) {
              this.searchForVideos(queryString);
            }, 500).bind(this)}/>
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
      // set state is built in react function
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
