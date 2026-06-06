import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes, { string } from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';
export class News extends Component{
       
  static defaultProps ={
     q: 'in',
     pageSize: 10,
     category:'general'
  }
    static propTypes ={
     q: PropTypes.string,
     pageSize: PropTypes.number,
     category: PropTypes.string,
    }
    capital = (string) =>{
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
   constructor(props){
    super(props);
    console.log("ello i am vaish");
    this.state={
    articles: [],
    loading: true,
    page:1,
    totalResults:0
     }
     document.title=`${this.capital(this.props.category)} - NewsNova`;
  }

  async updateNews(){
    this.props.setProgress(10);
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('q') || "";

    const url = searchQuery?`https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
    : `https://newsapi.org/v2/top-headlines?q=${this.props.q}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
   
    this.setState({loading:true});
    
   let data = await fetch(url);
     this.props.setProgress(30);
   let parseData = await data.json()
  this.props.setProgress(50);
   console.log(parseData);
   this.setState({articles: parseData.articles, totalResults: parseData.totalResults, loading:false, })
   this.props.setProgress(100);
  }


 async componentDidMount(){
  this.props.setProgress(10);
   const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('q') || "";
   
   let url = searchQuery 
      ? `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
      : `https://newsapi.org/v2/top-headlines?q=${this.props.q}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
   this.setState({loading:true});
   let data = await fetch(url);
   this.props.setProgress(60);
   let parseData = await data.json()
   console.log(parseData);
   this.setState({articles: parseData.articles, totalResults: parseData.totalResults, loading:false})
   this.props.setProgress(100);
  }
  handlePreviousClick= async()=>{
  //  
  this.setState({page: this.state.page- 1});
  this.updateNews();
  }
  handleNextClick= async()=>{
  //   if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
  //  let url =`https://newsapi.org/v2/top-headlines?q=${this.props.q}&category=${this.props.category}&apiKey=178199c489784e06817c1f92703deb2f&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
  //  this.setState({loading: true});
  //  let data = await fetch(url);
  //  let parseData = await data.json()
  //  this.setState({
  //   page: this.state.page + 1,
  //   articles: parseData.articles,
  //   loading: false

  // })
  // }
      this.setState({page: this.state.page + 1});
      this.updateNews();
}
 
   fetchMoreData =async ()=>{
    const nextPage = this.state.page + 1;
    this.setState({page: nextPage})
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('q') || ""; 

    const url = searchQuery 
      ? `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=${this.props.apiKey}&page=${nextPage}&pageSize=${this.props.pageSize}`
      : `https://newsapi.org/v2/top-headlines?q=${this.props.q}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${nextPage}&pageSize=${this.props.pageSize}` 

     let data = await fetch(url);
   let parseData = await data.json()
   console.log(parseData);
   this.setState({articles: this.state.articles.concat(parseData.articles), totalResults: parseData.totalResults })
   };

  render() {
       const urlParams = new URLSearchParams(window.location.search);
        const searchQuery = urlParams.get('q');
    return (
      <>
       
        <h2 className="text-center" style={{margin:'35px 0px', marginTop:'90px'}}>{searchQuery ? `Search Results for: ${this.capital(searchQuery)}` :`NewsNova - Top ${this.capital(this.props.category)} Headlines`}</h2>
       { this.state.loading &&<Spinner/>} 
        <InfiniteScroll 
        dataLength={this.state.articles.length}
        next={this.fetchMoreData}
        hasMore={this.state.articles.length !== this.state.totalResults}
        loader={<Spinner/>}
        >
          <div className="container">
           
          
           <div className= "row">
           { this.state.articles?.map((element)=>{
              return    <div className="col-md-4" key={element.url}>
                <NewsItem   title={(element.title)}  description={(element.description)}
                 imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                </div>

           })}
         </div>
        </div>
         </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1}type="button" className="btn btn-dark" onClick={this.handlePreviousClick}> &larr; Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)}type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
      </>
    )
  }
}
export default News
