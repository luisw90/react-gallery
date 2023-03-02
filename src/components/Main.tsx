import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

type Photo = {
    id: string,
    urls: { small:string },
    alt_description: string,
    user: { links: { html: string }, name: string},
    links: { html: string},
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

    const historyObj : string[] = [];

    const searchBar = useRef<HTMLInputElement | null>(null)
    const searchInput = () => {
        window.localStorage.setItem('searchHistory', JSON.stringify([...historyObj, searchBar.current!.value]))
        setSearch(searchBar.current!.value)
    }
    
    const historyPush = () => {
        const history = window.localStorage.getItem('searchHistory')
        if (history) {
            JSON.parse(history).forEach((prevSearch : string )=> historyObj.push(prevSearch))
        }
    }

    historyPush();
    return (
        <>  
            <div className="main-container">
                <div className="main-container__input">
                    <div className="input-container">
                        <div className="input-container__inner">
                            <input ref={searchBar} className="main-container__searchbar" type="search" placeholder="Search..."/>
                            <button onClick={searchInput} className="main-container__buttons__btn">Search</button>
                        </div>
                        <div id="input-container__outer">
                            <ul className="input-container__ul" id="ul-element"></ul>
                        </div>
                    </div>
                </div>
                <div>
                </div>
                <div className="main-container__images" id="main-container__images">
                    {data && data.map((photo: Photo, index: number) => {
                        return(
                            <Link to={{pathname: `${photo.id}`}} state = {{data: photo}}>
                                <div key={photo.id} className="flip-card">
                                    <div className="flip-card-inner">
                                        <div className="flip-card-front">
                                                <img className="main-container__photo" src={photo.urls.small} alt={photo.alt_description} />
                                        </div>
                                        <div className="flip-card-back">
                                            <h1><a href={ photo.user.links.html }>Link to Photographers profile</a></h1>
                                            <p> { photo.user.name } </p>
                                            <p><a href={ photo.links.html }>Link to Photo</a></p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                    )})}
                </div>
            </div>
        </>
    );
}
