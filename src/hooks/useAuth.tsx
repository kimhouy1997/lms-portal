import { useState } from "react";

export const useAuth = () => {
    const [isAuthenticated] = useState(false);
    const [loading] = useState(true);
    const [user] = useState(null);



    return {
        isAuthenticated,
        loading,
        user,
    }
}