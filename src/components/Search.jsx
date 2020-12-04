var Search = (props) => (
  <div className="search-bar form-inline">
    <input className="form-control" onChange={(e) => { props.searchForVideo(e.target.value); }} type="text" />
    <button className="btn hidden-sm-down">
      <span className="glyphicon glyphicon-search"></span>
    </button>
  </div>
  //onChange is a react built in function
  // takes in e which is 'event' and is a anom function
  //pass in our searchForVideo funtion we made through props
  //e.target.value is the valeu of our search box
);

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default Search;
