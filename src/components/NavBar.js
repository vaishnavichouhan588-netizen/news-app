import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class NavBar extends Component {
  constructor() {
    super();
    this.state ={
      searchQuery:""
    };
  }
  handleInputChange=(event)=>{
    this.setState({ searchQuery: event.target.value});
  }
  handleSearchSubmit =(event) =>{
    event.preventDefault();
    if(this.state.searchQuery.trim()!==""){
      window.location.href =`/search?q=${this.state.searchQuery}`;
    }
  }
  render() {
    return (
      <div>
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
                <Link className="navbar-brand" to="/">NewsNova</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item"> <Link className="nav-link " aria-current="page" to="/">Home</Link>
                    </li>
                  
                    <li className="nav-item"> <Link className="nav-link" to="/business">Business</Link></li>
                   <li className="nav-item"> <Link className="nav-link" to="/entertainment">  Entertainment</Link></li>
                   <li className="nav-item"> <Link className="nav-link" to="/general">   General</Link></li>
                   <li className="nav-item"><Link className="nav-link" to="/health">    Health</Link></li>
                   <li className="nav-item"><Link className="nav-link" to="/science">     Science</Link></li>
                   <li className="nav-item"><Link className="nav-link" to="/sports">    Sports</Link></li>
                    <li className="nav-item"> <Link className="nav-link" to="/technology">Technology</Link></li>

            
             </ul>
                <form onSubmit={this.handleSearchSubmit} className="d-flex" role="search">
                <input 
                    className="form-control form-control-sm me-2 rounded-pill" 
                    type="search" 
                    placeholder="Search news..." 
                    aria-label="Search"
                    value={this.state.searchQuery}
                    onChange={this.handleInputChange}
                />
                <button className="btn btn-sm btn-outline-light rounded-pill px-3" type="submit">
                    Search
                </button>
            </form>

    
        </div>
        </div>
      </nav>
     </div>
    )
  }
}


