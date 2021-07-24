import { useState, useEffect, FormEvent } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Axios from 'axios';

import CardReview from '../CardReview';
import deleteIcon from '../../assets/trash.svg';
import editIcon from '../../assets/edit.svg';

import './styles.css'

export default function FormReview(){
    const [movieName, setMovieName] = useState('');
    const [review, setReview] = useState('');
    const [movieReviewList, setMovieReviewList] = useState([]);
    const [newReview, setNewReview] = useState("");

    function preventDefault(event: FormEvent){
        event.preventDefault();
    }

    useEffect(() => {
        Axios.get("http://localhost:3333/api/get").then(response => {
            setMovieReviewList(response.data)
        })
    }, [movieReviewList])

    const submitReview = () => {
        Axios.post("http://localhost:3333/api/insert", {
            movieName: movieName,
            movieReview: review,
        }).then(
            toast.success('Successful submission.', {
                duration: 2000,
                position: 'bottom-center',
            })
        );
 
        setMovieReviewList([
            ...movieReviewList,
            {movieName: movieName, movieReview: review}
        ])
    }

    const deleteReview = (id) => {
        Axios.delete(`http://localhost:3333/api/delete/${id}`)
        toast.success('Review deleted successfully.', {
            duration: 2000,
            position:'bottom-center',
        })
    }

    const updateReview = (id) => {
        if(newReview === "" || newReview.trim() === ""){
            window.alert('Check if the fields are empty.')
        } else {
            Axios.put(`http://localhost:3333/api/update/${id}`, {
            movieReview: newReview,
        })
            toast.success('Review updated successfully.', {
                duration: 2000,
                position: 'bottom-center',
            })
        }
    }

    return(
        <div className="formContainer">
            <h1>CRUD</h1>

            <form className="form" onSubmit={preventDefault}>
                <div>
                    <label>Movie name:</label>
                    <input type="text" name="movieName" onChange={(event) => {
                        setMovieName(event.target.value)
                    }} />
                </div>
                <div>
                    <label>Review:</label>
                    <textarea type="text" name="review" onChange={(event) => {
                        setReview(event.target.value)
                    }} />
                </div>

                <button type="submit" onClick={submitReview}>Submit</button>
            </form>
            <div className="reviewList">
                {movieReviewList.map((value, key) => {
                    return (
                        <div key={key}>
                            <CardReview 
                                titleMovie={value.movieName} 
                                review={value.movieReview}
                                iconDelete={
                                    <button className="editButton" onClick={() => {updateReview(value.ID)}}>
                                        <img src={editIcon} alt="edit"/>
                                    </button>
                                }
                                iconEdit={
                                    <button className="deleteButton" onClick={() => {deleteReview(value.ID)}}>
                                         <img src={deleteIcon} alt="delete"/>
                                    </button>
                                }
                                inputText={
                                    <input type="text" onChange={(e) => {
                                        setNewReview(e.target.value)
                                    }}/>
                                }
                            />
                        </div>
                    )
                })}
            </div>
            <Toaster />
        </div>
    );
}