import { useEffect, useRef, useState } from "react";

type Photo = {
    id: string,
    urls: { small:string },
    alt_description: string
  };

export const Main = () => {
    const [search, setSearch] = useState<string>('')
    const [data, setData] = useState<Photo[]>([])
    // const [count, setCount] = useState(1)

    useEffect(() => {
        fetch(`https://api.unsplash.com/search/photos?page=1&query=${search}&client_id=${process.env.REACT_APP_ACCESS_KEY}`)
          .then(response => response.json())
          .then(response => setData(response.results))
    }, [search]);

    const searchBar = useRef<HTMLInputElement | null>(null)
    const searchInput = () => {
        console.log(searchBar.current!.value)
        setSearch(searchBar.current!.value)
    }
    
    return (
        <>
            <input ref={searchBar} type="text" />
            <button onClick={searchInput}>Search</button>
            <div className="main-container__images" id="main-container__images">
            {data && data.map((photo: Photo) => {return(  
                <div key={photo.id} className="flip-card">
                    <div className="flip-card-inner">
                        <div className="flip-card-front">
                            <img className="main-container__photo" src={photo.urls.small} alt={photo.alt_description} />
                        </div>
                        <div className="flip-card-back">
                            <h1>Unsplash link</h1>
                            <p>photographer name</p>
                            <p>photographer profile link</p>
                        </div>
                    </div>
                </div>
            )})}
            </div>
        </>
    );
}
