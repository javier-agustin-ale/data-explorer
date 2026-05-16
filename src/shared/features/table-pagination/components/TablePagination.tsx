import '../styles/table-pagination.css';

interface TablePaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
    onRecordsPerPageChange: (recordsPerPage: number) => void;
}
export function TablePagination({
    totalPages,
    currentPage,
    onPageChange,
    onRecordsPerPageChange,
}: TablePaginationProps) {
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
    const recordsPerPageOptions = [5, 10, 15, 20];

    return (
        <>
            <div className="pagination">
                <div className="pagination-controls">
                    <button
                        className="pagination-button"
                        onClick={() =>
                            currentPage === 1
                                ? null
                                : onPageChange(currentPage - 1)
                        }
                    >
                        &laquo;
                    </button>
                    <div className="page-numbers">
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
                <div className="total-records">
                    <span className="items-label">Items per page:</span>
                    <select
                        className="options"
                        id="total-records"
                        defaultValue={5}
                        onChange={(e) =>
                            onRecordsPerPageChange(Number(e.target.value))
                        }
                    >
                        {recordsPerPageOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </>
    );
}
