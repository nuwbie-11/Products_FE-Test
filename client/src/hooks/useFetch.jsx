import{ useEffect,useState } from 'react'


const useFetch = (url) => {
  const [data,setData] = useState()

  useEffect(()=>{
    fetch(`${process.env.REACT_APP_API_URL+url}`)
    .then((res)=>res.json())
    .then((data)=>setData(data["response"]))
  },[url])

  function handleChanges(newData){
    setData(newData)
  }

  return [data,handleChanges]
}

export default useFetch