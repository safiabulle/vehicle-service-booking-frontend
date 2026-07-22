import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
  username: "",
  email: "",
  first_name: "",
  last_name: "",
  phone_number: "",
  password: "",
  confirm_password: "",
});

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirm_password) {
    setError("Passwords do not match.");
    return;
  }

  const { confirm_password, ...userData } = formData;

  try {
    await register(userData);
    navigate("/login");
  } catch (err) {
    setError("Registration failed.");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">
          Register
        </h1>

        {error && (
          <p className="text-red-500 mb-4">
            {error}
          </p>
        )}

        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          className="w-full border rounded p-3 mb-3"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border rounded p-3 mb-3"
        />

        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          onChange={handleChange}
          className="w-full border rounded p-3 mb-3"
        />

        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          onChange={handleChange}
          className="w-full border rounded p-3 mb-3"
        />

        <input
          type="text"
          name="phone_number"
          placeholder="Phone Number"
          onChange={handleChange}
          className="w-full border rounded p-3 mb-3"
        />

        <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border rounded p-3 mb-3"
                />

                <input
                type="password"
                name="confirm_password"
                placeholder="Confirm Password"
                value={formData.confirm_password}
                onChange={handleChange}
                className="w-full border rounded p-3 mb-6"
                />
  

        <button
          type="submit"
          className="w-full bg-green-600 text-white rounded p-3 hover:bg-green-700"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;