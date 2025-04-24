import { useSelector, useDispatch } from "react-redux";
import {
    fetchNotifications,
    markAsRead,
    deleteNotification,
    unreadNotifications,
    
} from "../slices/notifications";

export const useNotify = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.notify);

  return {
    notifications: state.notifications,
    loading: state.loading,
    error: state.error,
    unread: state.unread,

    countUnread: ()=>dispatch(unreadNotifications()),
    getNotifications: () => dispatch(fetchNotifications()),
    deleteNotification: (id) => dispatch(deleteNotification(id)),
    markAsRead: (id) => dispatch(markAsRead(id)),
    
  };
};
