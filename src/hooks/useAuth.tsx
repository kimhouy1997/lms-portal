import { useState } from "react";

export const useAuth= ()=>{
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    
    return {
        isAuthenticated,
        loading,
        user,
    }
}