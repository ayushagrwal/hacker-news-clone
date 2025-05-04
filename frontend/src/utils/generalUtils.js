export const getHoursAgo = (timestamp) => {
  const createdDate = new Date(timestamp);
  const now = new Date();
  const diffMs = now - createdDate;

  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 1) return "just now";
  if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;

  return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
};

export const formatISOIntoDate = (isoString) => {
  const date = new Date(isoString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}