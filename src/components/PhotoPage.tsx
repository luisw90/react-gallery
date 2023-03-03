import { useLocation } from "react-router";
import { Link } from "react-router-dom";

export const PhotoPage = () => {
 
 const { state } = useLocation();
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
                    <Link to={{pathname: '/'}} state = {tag.title} key={tag.title}>
                        <button className="main-container__buttons__btn tag__button" key={tag.title}>{tag.title}</button>
                    </Link>
                )
                })}
                </div>
            </div>
        </div>
    </div>
 );
}