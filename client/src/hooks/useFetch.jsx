import{ useEffect,useState } from 'react'


const useFetch = (url) => {
  const [data,setData] = useState()

  useEffect(()=>{
    fetch(url)
    .then((res)=>res.json())
    .then((data)=>setData(data["response"]))
  },[url])

  function handleChanges(newData){
    setData(newData)
  }

  return [data,handleChanges]
}

export default useFetch