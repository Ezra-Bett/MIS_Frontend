import React, { useEffect, useState } from "react";
import axios from "../utils/axiosConfig";

function Navbar() {
    const [role, setRole] = useState("");

    useEffect(() => {
        axios.get("/core/user-role/").then(res => {
            setRole(res.data.role);
        });
    }, []);

    return (
        <nav>
            <a href="/dashboard">Dashboard</a>
            {role === "admin" && <a href="/admin/change-role">Change Roles</a>}
        </nav>
    );
}

export default Navbar;
