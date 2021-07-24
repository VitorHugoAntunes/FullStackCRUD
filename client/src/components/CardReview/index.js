import {ReactNode} from 'react';

import './styles.css';

interface CardReviewProps {
    titleMovie: ReactNode;
    review: ReactNode;
    iconDelete: ReactNode;
    iconEdit: ReactNode;
    inputText: ReactNode; 
}

export default function CardReview(props: CardReviewProps){
    return(
        <div className="cardReview">
            <h2>{props.titleMovie}</h2>
            <p className="reviewDescription">{props.review}</p>
            <div>
                {props.iconEdit}
            </div>
            <div className="inputEditReview">
                {props.inputText}
            </div>
            <div>{props.iconDelete}</div>
        </div>
    )
}