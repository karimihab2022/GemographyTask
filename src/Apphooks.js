import React, { useState, useRef, useCallback } from 'react'
import getdata from './getdata'
import star from "./images.png"


export default function Apphooks() {
  const [page, setPage] = useState(1)
  
    const {data,loading} = getdata(page)
  
 
  const observer = useRef()

  const loadingRef = useCallback(node => {
    if (loading) return

    if (observer.current) observer.current.disconnect()

    var options = {
        root: null, 
        rootMargin: "2000px",
        threshold: 0
      };

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPage(prevPage => prevPage + 1)
      }
    },options)
    if (node) observer.current.observe(node)
  }, [loading])

  

  return (  
      
      <div className="App" >
            <h1>Trending Repos</h1>
  
            <ul>
      
            {data.map((item,index) => (
        
                <li key={index}>
                    <h2>{item.name}  </h2>
                    <h3> {item.description}</h3>
          
                    <img className="avatar" src={item.owner.avatar_url} alt=""/>
                    <h3 className="inline">{item.owner.login} </h3>
                    <div className="stardiv">
                        <img className="star" src={star} alt=""/>
                        <h3>{item.watchers}</h3>
                    </div>
         
                </li>
            ))}

            </ul>

            <div ref={loadingRef}>


               { page<10 &&
            <p className="bottom">Loading...</p>}

            {page>=10 &&
            <p className="bottom">No More Repos</p>}           
            </div>
    
        </div>
    
  )
}