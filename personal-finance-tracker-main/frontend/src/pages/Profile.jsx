import { useEffect, useState } from "react";
import { getProfile, logoutUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getProfile()
            .then((res) => setUser(res.data.data))
            .catch(() => navigate("/auth"));
    }, []);

    const handleLogout = async () => {
        await logoutUser();
        alert("Logged out");
        navigate("/auth");
    };

    return user ? (
        <div className="max-w-md mx-auto mt-10 bg-white shadow-md rounded-lg p-6 text-center">
            <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name?.charAt(0))}&background=0D8ABC&color=fff`}
                alt="User Avatar"
                className="w-24 h-24 mx-auto rounded-full mb-4"
            />

            <h2 className="text-2xl font-semibold text-green-700 mb-2">
                Welcome, {user.name}
            </h2>
            <p className="text-gray-600 mb-6">Email: {user.email}</p>

            <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md"
            >
                Logout
            </button>
        </div>
    ) : (
        <p className="text-center mt-10 text-gray-600 text-lg">Loading...</p>
    );
};

export default Profile;
