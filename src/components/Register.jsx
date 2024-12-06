import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginOrRegister } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import AuthImage from '../assets/images/auth.png';
import toast from 'react-hot-toast';
import { USER_ROLES } from '../helpers/userRoles';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, token, role } = useSelector((state) => state.auth);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user && token) {
      if (role === USER_ROLES.USER) {
        navigate('/');
      } else if (role === USER_ROLES.ADMIN) {
        navigate("/admin");
      }
    }
  }, [user, token, navigate, role]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error('Username is required!');
      return;
    }
    if (!password) {
      toast.error('Password is required!');
      return;
    }

    try {
      const credentials = { username, password };
      const response = await dispatch(loginOrRegister(credentials)).unwrap();

      if (response?.user) {
        if (role === "Admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message || 'Registration failed! Please try again.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-50 to-purple-100">
      <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="hidden lg:flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500 w-1/2 p-8">
          <img
            src={AuthImage}
            alt="Illustration"
            className="w-3/4"
          />
        </div>
        <div className="w-full lg:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-gray-800">Welcome to Focus!</h2>
          <p className="text-gray-500 mb-6">Register your account</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-600 mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Your Username"
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="8+ characters"
                  className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-purple-700 focus:ring-4 focus:ring-purple-500"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
