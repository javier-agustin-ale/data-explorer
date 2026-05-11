import { JSX } from 'react';
import '../styles/table-pagination.css';

interface TablePaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}
export function TablePagination({totalPages, currentPage, onPageChange}: TablePaginationProps) {

    
    return (
        <>
            <div className="pagination">
                
            </div>
        </>
    )
}