import React from 'react';
import './Pagination.css'

interface Pagination {
    active: number,
    totalPages: number
    setPage: (active: number) => void;
}

const Pagination: React.FC<Pagination> = ({totalPages, active, setPage}) => {
    let pages = [];
    for (let number = 1; number <= totalPages; number++) {
        pages.push(number);
    }
    return (
        <div className="center">
            <ul className="pagination">
                <li>
                    <div onClick={() => setPage(1)}>Первая</div>
                </li>
                <li>
                    <div onClick={(active - 1) >= 1 ? () => setPage(active - 1) : undefined}>«</div>
                </li>
                {pages?.map((page: number, index: number) =>
                    <li  key={page}>
                        <div

                            className={index + 1 === active ? "active" : ''}
                            onClick={() => setPage(index + 1)}
                        >
                            {page}
                        </div>
                    </li>
                )}
                <li>
                    <div onClick={(active + 1) <= totalPages ? () => setPage(active + 1) : undefined}>»</div>
                </li>
                <li>
                    <div onClick={() => setPage(totalPages)}>Последняя</div>
                </li>
            </ul>
        </div>
    );
};

export default Pagination;