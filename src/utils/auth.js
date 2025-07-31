import jwt_decode from "jwt-decode";

export const getToken = () => {
    return localStorage.getItem("access");
};

export const decodeToken = () => {
    const token = getToken();

    if (!token) return null;

    try {
        return jwt_decode(token);
    } catch (error) {
        console.error("Invalid token");
        return null;
    }
};

export const getUserRole = () => {
    const decoded = decodeToken();
    return decoded?.role || null;
};

export const isAuthenticated = () => {
    const token = getToken();

    if (!token) return false;

    const decoded = decodeToken();

    // Optionally check expiry
    if (decoded?.exp * 1000 < Date.now()) {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        return false;
    }

    return true;
};
