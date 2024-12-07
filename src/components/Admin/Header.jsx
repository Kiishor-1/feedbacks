import { useSelector } from 'react-redux';
import { formatDate } from '../../helpers/formatDate';


export default function Header() {
    const { user } = useSelector((state) => state.auth);
    const currentDate = new Date();
    return (
        <div className="flex items-center justify-between p-2 min-w-[400px]">
            <div className="text-xl font-semibold text-[#282828] cursor-pointer uppercase">
                Welcome! {user?.username || 'Admin'}
            </div>
            <div className="text-[#707070]  font-medium leading-[30px] px-4">
                {formatDate(currentDate)}
            </div>
        </div>
    )
}
