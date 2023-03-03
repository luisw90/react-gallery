import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router"

type Photo = {
    id: string,
    urls: { small:string },
    alt_description: string,
    user: { links: { html: string }, name: string, profile_image: { medium: string } },
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

    document.onkeydown = event => {
      if (event.key === 'Enter') {
        if (searchBar.current!.value) {
          window.localStorage.setItem('searchHistory', JSON.stringify([...historyObj, searchBar.current!.value]))
          setSearch(searchBar.current!.value)
        }
      }
    };

    const HistoryPush = () => {
        const history = window.localStorage.getItem('searchHistory')
        if (history) {
            JSON.parse(history).forEach((prevSearch : string )=> historyObj.push(prevSearch))
        }

        const { state } = useLocation();
        useEffect(() => {
          if (state) {
            fetch(`https://api.unsplash.com/search/photos?page=1&query=${state}&client_id=${process.env.REACT_APP_ACCESS_KEY}`)
          .then(response => response.json())
          .then(response => setData(response.results))
          } 
        }, [state])
        
    }

    HistoryPush();
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
                    {data && data.map((photo: Photo) => {
                        return(
                          <div className="test" key={photo.id}>
                          <Link className="flip-card" to={{pathname: `${photo.id}`}} state = {{data: photo}}>
                              <img className="flip-card__image" src={photo.urls.small} alt={photo.alt_description} />
                          
                              <div className="flip-card-back">
                                
                                <div>
                                  <img className="artist__photo" src={photo.user.profile_image.medium} alt={photo.alt_description} />
                                </div>

                                <div className="artist__text-container">
                                  <p className="artist__text"> Photographer: { photo.user.name } </p>

                                
                                </div>                                  
                              </div>
                          </Link>
                          <button className="artist__button"><a href={ photo.user.links.html }>Link to profile</a></button>
                          </div>
                    )})}
                </div>
            </div>
        </>
    );
}
