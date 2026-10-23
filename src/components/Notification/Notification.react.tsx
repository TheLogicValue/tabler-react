import * as React from "react";
import Avatar from "../Avatar";
import Text from "../Text";
import NotificationTray from "./NotificationTray.react";

export type NotificationProps = {
  /**
   * The  avatar image URL
   */
  readonly avatarURL?: string;
  /**
   * The message displayed within the Notification
   */
  readonly message: React.ReactNode;
  /**
   * The time displayed within the Notification
   */
  readonly time?: string;
  /**
   * Indicate the notification as unread
   */
  readonly unread?: boolean;
};

/**
 * An individual Notification made up of an Avatar alongside some text and the time
 */
function Notification({ avatarURL, message, time, unread }: NotificationProps): React.ReactNode {
  return (
    <React.Fragment>
      {avatarURL && (
        <Avatar className="mr-3 align-self-center" imageURL={avatarURL} />
      )}
      <div>
        {message}
        {time && (
          <Text color="muted" size="small">
            {time}
          </Text>
        )}
      </div>
    </React.Fragment>
  );
}

Notification.Tray = NotificationTray;

export default Notification;

export type Props = NotificationProps;
