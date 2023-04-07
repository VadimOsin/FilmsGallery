import React from 'react';
import './SearchWorld.css'

interface SearchWorld {
    str: string,

    setStr: (str: string) => void
    setPages: (str: number) => void
}

const SearchWorlds: React.FC<SearchWorld> = ({str, setStr, setPages}) => {

    return (
        <div className="searchWorld__input-container">
            <input
                type="text"
                placeholder="Search world..."
                className="searchWorld__input"
                value={str}
                onChange={(event) => {
                    setStr(event.target.value)
                    setPages(1)
                }}
                maxLength={25}
            />
            <svg
                fill="#000000"
                width="25px"
                height="25px"
                viewBox="0 0 16 16"
                className="searchWorld__svg"
            >
                <path
                    d="M12.027 9.92L16 13.95 14 16l-4.075-3.976A6.465 6.465 0 0 1 6.5 13C2.91 13 0 10.083 0 6.5 0 2.91 2.917 0 6.5 0 10.09 0 13 2.917 13 6.5a6.463 6.463 0 0 1-.973 3.42zM1.997 6.452c0 2.48 2.014 4.5 4.5 4.5 2.48 0 4.5-2.015 4.5-4.5 0-2.48-2.015-4.5-4.5-4.5-2.48 0-4.5 2.014-4.5 4.5z"/>
            </svg>
        </div>

    );
};

export default SearchWorlds;