import { useEffect, useState } from "react";

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
        fetch(`https://api.unsplash.com/search/photos?page=${count}&query=${search}&client_id=${process.env.REACT_APP_ACCESS_KEY}`)
          .then(response => response.json())
          .then(response => setData(response.result))
    }, [search, count]);

    return (<main>{
        data.map((photo: Photo) => <img className="main-container__photo" src={photo.urls.small} alt={photo.alt_description} />)
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