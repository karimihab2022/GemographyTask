import React from "react";
import axios from "axios";
import star from "./images.png"
import './App.css';


class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: [],
        page: 1,
        loading: false,
        prevY: 0
      };
    }
  
    componentDidMount() {
      this.getUsers(this.state.page);
      
      var options = {
        root: null, 
        rootMargin: "2000px",
        threshold: 0
      };

      this.observer = new IntersectionObserver(
        this.handleObserver.bind(this),options);

      this.observer.observe(this.loadingRef);
    }
  
    handleObserver(entities) {
      const y = entities[0].boundingClientRect.y;
      if (this.state.prevY > y) {
        const curPage = this.state.page + 1;
        this.getUsers(curPage);
        this.setState({ page: curPage });
      }
      this.setState({ prevY: y });
    }
  

    getUsers(page) {
      if(page>=10) return
      this.setState({ loading: true });
      axios
        .get(`https://api.github.com/search/repositories?q=created:>2021-06-07&sort=stars&order=desc&per_page=100&page=${page}`)
        .then(res => {
          this.setState({ data: [...this.state.data, ...res.data.items] });
          this.setState({ loading: false });
        });
    }
  
    render() {
      
      return (
        <div className="App">
          <div style={{ minHeight: "800px" }}>
          <h1>Trending Repos</h1>
            <ul>
              {this.state.data.map((item,i) => (
                   <li key={i}>
                   <h2>{item.name}  </h2>
                   <h3> {item.description}</h3>
                   
                   <img className="avatar" src={item.owner.avatar_url} alt=""/>
                   <h3 className="inline">{item.owner.login} </h3>
                   <div className="stardiv">
                   <img className="star" src={star} alt=""/>
                   <h3>{item.watchers}</h3>
                   </div>
                  
                 </li>
              ))
              }
            </ul>
          </div>
          <div
            ref={loadingRef => (this.loadingRef = loadingRef)} >
              { this.state.page<10 &&
            <p className="bottom">Loading...</p>}
            {this.state.page>=10&&
            <p className="bottom">No More Repos</p>}
          </div>
        </div>
      );
    }
  }
  export default App;