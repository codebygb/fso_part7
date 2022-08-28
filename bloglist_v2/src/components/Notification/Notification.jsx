import { useDispatch, useSelector } from "react-redux";
import close from "../../assets/icons/close.svg";
import { removeNotification } from "../../features/notifications/notificationSlice";

const Notification = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notifications);
  const handleClose = (id) => {
    dispatch(removeNotification(id));
  };

  return (
    <div className="notification-container">
      {notification.map((n) => (
        <div
          style={{
            background:
              n.notificationType === "success" ? "green" : "#fe4747f5",
          }}
          key={n.notificationId}
          className="notification"
        >
          <div>{n.notificationMessage}</div>
          <img
            src={close}
            alt=""
            className="close-notification"
            onClick={() => handleClose(n.notificationId)}
          />
        </div>
      ))}
    </div>
  );
};

export default Notification;
