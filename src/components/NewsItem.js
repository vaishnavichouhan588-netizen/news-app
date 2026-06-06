import React, { Component } from 'react'

export class NewsItem extends Component {
  constructor() {
    super();
    this.state = {
        isSpeaking: false
    };
  }
 
  // Yeh function news ko read karega aur stop karega
handleSpeech = () => {
    // Agar audio pehle se chal raha hai, toh click karne par stop ho jaye
    if (window.speechSynthesis.speaking && this.state.isSpeaking) {
        window.speechSynthesis.cancel();
        this.setState({ isSpeaking: false});
        return;
    }

    // Jo text sunana hai usko combine kar rahe hain
    let titleText = this.props.title ? this.props.title : "";
    let descText = this.props.description ? this.props.description : "";
    let fullText = `${titleText}. ${descText}`;

    // Speech synthesis ka object banana
    let utterance = new SpeechSynthesisUtterance(fullText);
    
    utterance.onend =() =>{
      this.setState({ isSpeaking: false});
    };
    this.setState({ isSpeaking: true});
    window.speechSynthesis.speak(utterance);
}

   handleShare = async() =>{
    if(navigator.share){
      try{
        await navigator.share({
          title: this.props.title,
          text: `Check out this news on NewsNova: ${this.props.title}`,
          url: this.props.newsUrl,
        });
        console.log("Successfully shared!");
      } catch(error){
        console.log("Error sharing:",error);
      }
    } else{
      alert("Oops! Your browser doesn't support direct sharing. Please copy the link");
    }
   }
  render() {
    let{title, description,imageUrl,newsUrl, author, date, source}=this.props;
    return (
      <div className="my-3">
       <div className="card  h-100 shadow-sm border-0" >  
        <div style={ { display:'flex' ,
          justifyContent: 'flex-end', 
          position: 'absolute' ,
          right: '0'

        }} >
          <span className= " badge rounded-pill bg-danger" >{source}</span>
        </div>
        <img src={!imageUrl?"https://img.etimg.com/thumb/msid-131420591,width-650,height-488,imgsize-92794,resizemode-75/sudharsan-gill-54-runs-away-from-best-ipl-season-by-batting-pair.jpg":imageUrl} className="card-img-top" alt="..."/>
        <div className="card-body d-flex flex-column justify-content-between">
            <h5 className="card-title">{title}</h5>
           <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-danger">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
             <div className="d-flex justify-content-between align-items-center mt-3">
            <a rel="noreferrer" href={newsUrl}target="_blank" className="btn btn-sm btn-link text-deoration-none fw-bold p-0 text-dark">Read More</a>
           <div className="d-flex align-items-center">
            <button onClick={this.handleSpeech} className={`btn btn-sm ms-2 ${this.state.isSpeaking ? 'btn-outline-danger' : 'btn-light text-secondary'}`}>
            {this.state.isSpeaking ? "⏹️ Stop" : "🔊 Listen"}
    </button>
     <button onClick={this.handleShare} className="btn btn-sm btn-outline-dark ms-2 px-3 rounded-pill">
    🔗 Share
    </button>
    </div>
    </div>
        </div>  
    </div>
      </div>
    )
  }
}

export default NewsItem
