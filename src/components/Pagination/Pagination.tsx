import React from 'react';
import ReactPaginate from "react-paginate";
import styles from './Pagination.module.scss';

type PropsType = {
    setCurrentPage: (number: number) => void
    currentPage: number
}
export const Pagination = (props: PropsType) => {
    return (
        <ReactPaginate
            breakLabel="..."
            className={styles.root}
            nextLabel=">"
            onPageChange={(event) => props.setCurrentPage(event.selected + 1)}
            pageRangeDisplayed={5}
            pageCount={3}
            forcePage={props.currentPage - 1}
            previousLabel="<"
            renderOnZeroPageCount={null}
        />
    );
};
