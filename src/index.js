import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class QuoteMachine extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            quote: '',
            author:''
        }
       this.getQuoteFromAPI = this.getQuoteFromAPI.bind(this); 
       this.getQuoteFromAPI();

    }
    componentDidMount() {
        const script = document.createElement("script");
    
        script.src =
          "https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js";
        script.async = true;
    
        document.body.appendChild(script);
      }
    getQuoteFromAPI () {
        //e.preventDefault();
        var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        let endPoint = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand";
        fetch(proxyUrl + endPoint, { cache: "reload" })
        .then(response => response.json())
        .then((jsonData) => {
            this.setState({
                quote : jsonData[0].content,
                author: jsonData[0].title
            })
        });
    }
    render() {
        let regex = new RegExp(/(<p>)|(\/p>)/gi);
        let tweetLink = "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" + this.state.quote.replace(regex,"");
        
      return (
        <div className="quote-box" id="quote-box">
          <h1>Quote For Thought!</h1>
          <div id="text" dangerouslySetInnerHTML={{ __html: this.state.quote }}></div>
          <p id="author">Author:{this.state.author}</p>
          <button id="new-quote" onClick={this.getQuoteFromAPI} >Get New Quote</button>
          <br />
          <a id="tweet-quote" href={tweetLink} target="_blank">Tweet</a>   
        </div>
      );
    }
  }
  
// ========================================

ReactDOM.render(
    <QuoteMachine />,
    document.getElementById('root')
  );
  