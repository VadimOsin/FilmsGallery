import React from 'react';
import './RatihgSelect.css'

interface ratingSelect{
    setRating: (year: string) => void
}
const RatingSelect:React.FC<ratingSelect> = ({setRating}) => {
    let rating = []
    for (let i = 0; i < 10; i++) {
        rating.push(i + 1)
    }

    return (
        <div className="ratingSelect">
            <label>
                <select onChange={(event) => setRating(event.target.value)}>
                    <option value={`&yearFrom=''&yearTo=''`}>Рейтинг от: 0-10</option>
                    {
                        rating.map(r =>
                            <option key={r} value={r}>{r}</option>
                        )
                    }
                </select>
            </label>
        </div>
    );
};

export default RatingSelect;