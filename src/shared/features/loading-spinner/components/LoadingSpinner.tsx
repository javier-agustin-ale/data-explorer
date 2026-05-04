import '../styles/loading-spinner.css';

interface props {
    showLoading: boolean;
}
export default function LoadingSpinner({ showLoading }: props) {
    return showLoading ? <div className="loading-spinner"></div> : null;
}
