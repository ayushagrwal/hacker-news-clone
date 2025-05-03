export const getHoursAgo = (timestamp) => {
    const createdDate = new Date(timestamp);
    const now = new Date();
    const diffMs = now - createdDate;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    return diffHours <= 0 ? "just now" : `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
};