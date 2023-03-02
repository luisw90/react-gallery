import { useEffect, useRef, useState } from "react";

type Photo = {
    urls: { small:string },
    alt_description: string
  };

export const Main = () => {
    const [search, setSearch] = useState('bless')
    const [data, setData] = useState<Photo[]>([])
    const [count, setCount] = useState(1)
    
    // const apiCall = async (search: string, count: number) => {
    //     const photos = await fetch(`https://api.unsplash.com/search/photos?page=${count}&query=${search}&client_id=${process.env.REACT_APP_ACCESS_KEY}`);
    //     const data = await photos.json();
    //     return data.results;
    // };

    useEffect(() => {
        fetch(`https://api.unsplash.com/search/photos?page=1&query=${search}&client_id=${process.env.REACT_APP_ACCESS_KEY}`)
          .then(response => response.json())
          .then(response => setData(response.result))
    }, [search, count]);

    const searchBar = useRef<HTMLInputElement | null>(null)
    const searchInput = () => {
        console.log(searchBar.current!.value)
        setSearch(searchBar.current!.value)
    }
    
    return (
        <main>
            <input ref={searchBar} type="text" />
            <button onClick={searchInput}>Search</button>
            {data && data.map((photo: Photo) => { return <img className="main-container__photo" src={photo.urls.small} alt={photo.alt_description} />})
        }</main>);
}

// const result = data.result.map((photo: Photo) => { (
//     <div className="flip-card">
//       <div className="flip-card-inner">
//         <div className="flip-card-front">
//           <img className="main-container__photo" src={photo.urls.small} alt={photo.alt_description} />
//         </div>
//         <div className="flip-card-back">
//           <h1>Unsplash link</h1>
//           <p>photographer name</p>
//           <p>photographer profile link</p>
//         </div>
//       </div>
//     </div>
//     )});