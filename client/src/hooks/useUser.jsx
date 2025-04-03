import { useContext } from 'react';
import { userContext } from '../context/context';


const useUser = () => {
    const { user, setUser } = useContext(userContext);
    return {user , setUser };
}