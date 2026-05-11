import '../styles/table-pagination.css';

interface TablePaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}
export function TablePagination({
    totalPages,
    currentPage,
    onPageChange,
}: TablePaginationProps) {
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <>
            <div className="pagination">
                <button
                    className="pagination-button"
                    onClick={() =>
                        currentPage === 1 ? null : onPageChange(currentPage - 1)
                    }
                >
                    &laquo;
                </button>
                <div>
                    {pageNumbers.map((page) => (
                        <button
                            className={
                                page === currentPage
                                    ? 'pagination-button active'
                                    : 'pagination-button'
                            }
                            key={page}
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </button>
                    ))}
                </div>
                <button
                    className="pagination-button"
                    onClick={() =>
                        currentPage < totalPages
                            ? onPageChange(currentPage + 1)
                            : null
                    }
                >
                    &raquo;
                </button>
            </div>
        </>
    );
}
