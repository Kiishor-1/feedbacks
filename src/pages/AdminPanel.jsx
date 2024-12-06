import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; 
import { useDispatch, useSelector } from 'react-redux';
import { USER_ROLES } from '../helpers/userRoles';
import { FiLogOut } from 'react-icons/fi';
import { logout, logoutUser } from '../slices/authSlice';
import toast from 'react-hot-toast';

const AdminPanel = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, token, role } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  useEffect(() => {
    if (user && token) {
      if (role === USER_ROLES.USER) {
        navigate('/');
      } else if (role === USER_ROLES.ADMIN && window.location.pathname === "/admin") {
        navigate("/admin");
      }
    } else {
      navigate('/login');
    }
  }, [user, token, navigate, role]);

  const handleLogout = async () => {
    try {
      dispatch(logout())
      toast.success("User logged out successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(error.message || 'Error during logout')
    }
  }


  return (
    <div className="flex h-screen overflow-hidden">
      <div className="p-4 lg:hidden">
        <FaBars className="text-[1.2rem] cursor-pointer" onClick={toggleSidebar} />
      </div>
      <div className={`fixed inset-y-0 left-0 bg-gray-800 text-white w-64 transform z-[10000] ${isSidebarOpen ? "translate-x-0" : "translate-x-[-120%]"} transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0`}>
        <div className="flex items-center justify-between p-4 font-bold text-3xl drop-shadow-[2px_2px_8px_blue]">
          {`Feedbacks`}
          <FaTimes
            className="cursor-pointer hover:text-gray-400 lg:hidden block text-[1.2rem]"
            onClick={toggleSidebar}
            style={{ zIndex: 10 }}
          />
        </div>
        <nav className="flex-1 px-4 py-2">
          <ul className="space-y-2">
            <li>
              <Link to="/admin" className="block p-2 hover:bg-gray-700 rounded-md">All Feedbacks</Link>
            </li>
          </ul>
        </nav>
        <button onClick={handleLogout} className='text-md flex items-center gap-2 absolute bottom-4 left-4'>
          <FiLogOut />
          Logout
        </button>
      </div>

      <div className={`flex-1 bg-gray-100 px-6 ${isSidebarOpen ? "opacity-50" : "opacity-100"} transition-opacity duration-300`}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPanel;


