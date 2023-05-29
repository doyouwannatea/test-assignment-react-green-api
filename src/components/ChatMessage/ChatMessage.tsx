import { Notification } from '@/models/green-api';
import styles from './ChatMessage.module.scss';
import { classNamesFunc } from 'classnames-generics';

const classNames = classNamesFunc<keyof typeof styles>();

type Props = { notification: Notification };

export default function ChatMessage({ notification }: Props) {
  const message = notification.body.messageData;

  if (message?.extendedTextMessageData)
    return (
      <span className={classNames(styles.message, styles['outgoing-message'])}>
        {message.extendedTextMessageData.text}
      </span>
    );
  if (message?.textMessageData)
    return (
      <span className={classNames(styles.message, styles['received-message'])}>
        {message.textMessageData.textMessage}
      </span>
    );
  return null;
}
