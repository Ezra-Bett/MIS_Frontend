import React, { useEffect, useState } from "react";
import axios from "../utils/axiosConfig";

function Dashboard() {
    const [role, setRole] = useState("");

    useEffect(() => {
        axios.get("/core/user-role/").then(res => {
            setRole(res.data.role);
        });
    }, []);

    if (!role) return <p>Loading...</p>;

    return (
        <div>
            <h1>Welcome to the Dashboard</h1>
            {role === "admin" && (
                <>
                    <h2>This is the Admin Dashboard</h2>
                    <a href="/admin/change-role">Change User Roles</a>
                </>
            )}
            {role === "teacher" && <h2>This is the Teacher Dashboard</h2>}
            {role === "student" && <h2>This is the Student Dashboard</h2>}
        </div>
    );
}

export default Dashboard;
