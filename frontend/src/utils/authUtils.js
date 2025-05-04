/**
 * Authentication Utility Functions
 * Contains helper functions for JWT token handling and user information
 */

/**
 * Parse JWT token to extract payload data
 * 
 * @param {string} token - JWT token string
 * @returns {Object|null} Decoded token payload or null if invalid
 */
export const parseJwt = (token) => {
  try {
    // Extract the payload part of the JWT (second segment)
    const base64Url = token.split('.')[1];
    // Convert base64url to regular base64
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    // Decode base64 string to get JSON payload
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Failed to parse JWT token:', error);
    return null;
  }
};

/**
 * Get current user information from stored JWT token
 * 
 * @returns {Object|null} User object with id and name, or null if not authenticated
 */
export const getUserFromToken = () => {
  // Retrieve token from localStorage
  const token = localStorage.getItem('accessToken');
  if (!token) return null;
  
  // Decode token and extract user information
  const decodedToken = parseJwt(token);
  return decodedToken ? { id: decodedToken.id, name: decodedToken.name } : null;
}; 