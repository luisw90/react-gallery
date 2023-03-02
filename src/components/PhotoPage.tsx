import { useLocation } from "react-router";

export const PhotoPage = () => {

 const { state } = useLocation();
 console.log(state.data)
 return (
    <div className="item">
        <div className="item__container">
            <div>
                <img className="item__img" alt={ state.data.alt_description } src={ state.data.urls.regular }/>
            </div>
            <div>
                <p className="item__text"> Photo Description: {state.data.alt_description}</p>
                <div className="item__Button-container">
                {state.data.tags.map((tag : any) => {
                return (
                        <button className="main-container__buttons__btn" key={tag.title}>{tag.title}</button>
                )
                })}
                </div>
            </div>
        </div>
    </div>
 );
}