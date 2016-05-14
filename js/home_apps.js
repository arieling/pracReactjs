var PersonBox = React.createClass({
  getInitialState: function() {
    return {data: []};
  },

  componentDidMount: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  render: function() {
    return (
      <div className="personBox">
        <PersonList data={this.state.data}/>
      </div>
    );
  }
});


var PersonList = React.createClass({
  render: function() {
   var personNodes = this.props.data.map(function(person) {
      return (
        <Person id={person.id} lastName={person.lastName} firstName={person.firstName} />
      );
    });

    return (
      <div className="personList">
        {personNodes}
      </div>
    );
  }
});

var Person = React.createClass({
  render: function() {
    return (
      <div className="comment">
        <ul>
        <li>
          <p className="commentAuthor">Person: </p>
          <p className="commentAuthor">id: {this.props.id}</p>
          <p className="commentAuthor">first name: {this.props.firstName}</p>
          <p className="commentAuthor">last name: {this.props.lastName}</p>
        </li>
      </ul>
      </div>
    );
  }
});


ReactDOM.render(
  <PersonBox url="http://localhost:8080/arena/api/persons/list/"/>,
  document.getElementById('content')
);

var link = 1;
var InputForm = React.createClass({
  getInitialState: function() {
    return {link: ''};
  },
  handleLinkChange: function(e) {
    this.setState({link: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    link = this.state.link.trim();
    if (!link) {
      return;
    }
    this.props.onIdSubmit({link: link});
    this.setState({link: ''});
  },

  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Person id"
          onChange={this.handleLinkChange}/>
        <input type="submit" value="Post" />
      </form>
    );
  }
});

var SearchBox = React.createClass({
  handleIdSubmit: function(person) {
    $.ajax({
      url: "http://localhost:8080/arena/api/persons/get/" + link + "/spells",
      dataType: 'json',
      data: person,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  render: function() {
    return (
      <div className="commentBox">
        <InputForm onIdSubmit={this.handleIdSubmit} />
        <PersonList data={this.state.data}/> 
      </div>
    );
  }
});

ReactDOM.render(
  <SearchBox/>,
  document.getElementById('search')
);
