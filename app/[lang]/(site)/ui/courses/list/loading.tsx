import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import "./styles.css";

export default function Loading() {
  return (
    <div className="courses-list skeleton">
      <div className="item">
        <div className="image">
          <Skeleton height={120} />
        </div>
        <div className="content">
          <h3>
            <Skeleton />
          </h3>
          <p>
            <Skeleton />
          </p>
          <div className="details">
            <Skeleton />
          </div>
          <Skeleton className="skeleton-btn" />
        </div>
      </div>
      <div className="item">
        <div className="image">
          <Skeleton height={120} />
        </div>
        <div className="content">
          <h3>
            <Skeleton />
          </h3>
          <p>
            <Skeleton />
          </p>
          <div className="details">
            <Skeleton />
          </div>
          <Skeleton className="skeleton-btn" />
        </div>
      </div>
      <div className="item">
        <div className="image">
          <Skeleton height={120} />
        </div>
        <div className="content">
          <h3>
            <Skeleton />
          </h3>
          <p>
            <Skeleton />
          </p>
          <div className="details">
            <Skeleton />
          </div>
          <Skeleton className="skeleton-btn" />
        </div>
      </div>
    </div>
  );
}
