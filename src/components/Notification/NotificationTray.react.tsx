import * as React from "react";
import Notification from "./Notification.react";
import Dropdown from "../Dropdown";
import type { Props as NotificationProps } from "./Notification.react";

export type NotificationTrayProps = {
  /**
   * Notification components
   */
  readonly children?: React.ReactNode;
  /**
   * An array containing objects of notification data
   */
  readonly notificationsObjects?: ReadonlyArray<NotificationProps>;
  /**
   * Display a small red circle to symbolize that there are unread notifications
   */
  readonly unread?: boolean;
  /**
   * Action to run when the 'Mark All As Read' button is activated
   */
  readonly markAllAsRead?: () => void;
};

/**
 * An Icon triggered Dropdown containing Notifications
 */
function NotificationTray(props: NotificationTrayProps): React.ReactNode {
  const { children, unread, notificationsObjects, markAllAsRead } = props;
  const notifications = children && React.Children.toArray(children);
  return (
    <Dropdown
      triggerContent={unread && <span className="nav-unread" />}
      toggle={false}
      icon="bell"
      isNavLink={true}
      position="bottom-end"
      arrow={true}
      arrowPosition="right"
      flex
      items={
        <React.Fragment>
          {(notifications &&
            notifications.map((n: React.ReactNode, i) => (
              <Dropdown.Item className="d-flex" key={i}>
                {n}
              </Dropdown.Item>
            ))) ||
            (notificationsObjects &&
              notificationsObjects.map((n, i) => (
                <Dropdown.Item
                  className={`d-flex ${n.unread ? "bg-light" : ""}`}
                  key={i}
                >
                  <Notification
                    unread={n.unread}
                    avatarURL={n.avatarURL}
                    message={n.message}
                    time={n.time}
                  />
                </Dropdown.Item>
              )))}
          {markAllAsRead && unread && (
            <React.Fragment>
              <Dropdown.ItemDivider />
              <Dropdown.Item
                className="text-center text-muted-dark"
                onClick={() => markAllAsRead()}
              >
                Mark all as read
              </Dropdown.Item>
            </React.Fragment>
          )}
        </React.Fragment>
      }
    />
  );
}

export default NotificationTray;

export type Props = NotificationTrayProps;
