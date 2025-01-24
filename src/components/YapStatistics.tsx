import "../styles/YapStatistics.scss"

interface YapStatisticsProps {
    likes: number;
    comments: number;
    onCommentPictogramClick: () => void;
}

export default function YapStatistics(props: YapStatisticsProps) {
    return (
        <div className="yap-statistics">
            <span>🤍{props.likes}</span>
            <span onClick={props.onCommentPictogramClick}>💬{props.comments}</span>
        </div>
    )
}