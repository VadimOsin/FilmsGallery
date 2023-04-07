import React from 'react';
import './YearSelect.css'

interface YearSelect {
    date: number
    setYear: (year: string) => void

    setPages: (str: number) => void
}

const YearSelect: React.FC<YearSelect> = ({date, setYear, setPages}) => {

    let year = []
    for (let i = date; i > 2013; i--) {
        year.push(i)
    }
    return (
        <div className="yearSelect">
            <label>
                <select onChange={(event) => {
                    setYear(event.target.value)
                    setPages(1)
                }}>
                    <option value={`&yearFrom='1500'&yearTo='3000'`}>Все года</option>
                    {
                        year.map(r =>
                            <option key={r} value={`&yearFrom=${r}&yearTo=${r}`}>{r}</option>
                        )
                    }
                    <option value={'&yearFrom=2010&yearTo=2015'}>2010-2015</option>
                    <option value={'&yearFrom=2000&yearTo=2010'}>2000-2010</option>
                    <option value={'&yearFrom=1990&yearTo=2000'}>1990-2000</option>
                    <option value={'&yearFrom=1980&yearTo=1990'}>1980-1990</option>
                    <option value={'&yearFrom=1500&yearTo=1980'}>До 1980</option>
                </select>
            </label>
        </div>
    );
};

export default YearSelect;