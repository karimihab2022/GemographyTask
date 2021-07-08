import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useBookSearch(page) {

    
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])

  
  useEffect(() => {

    if(page>=10) return

    setLoading(true)
    axios
          .get(`https://api.github.com/search/repositories?q=created:>2021-06-07&sort=stars&order=desc&per_page=100&page=${page}`)
          .then(res => {
            setData(prevdata=>{return [...new Set ([...prevdata,...res.data.items])]
            })})
            setLoading(false)

   
  }, [page])

  return { loading, data }
}