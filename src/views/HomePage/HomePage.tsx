import { useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useWatchAuth } from '@/hooks/useWatchAuth';
import styles from './HomePage.module.scss';
import ContactList from '@/components/ContactList';

export default function HomePage() {
  const [contactList, setContactList] = useState<string[]>([]);
  const { chatId } = useParams();
  useWatchAuth();

  function addContact(contact: string) {
    setContactList((prevList) => [...prevList, contact]);
  }

  return (
    <section className={styles['page-wrapper']}>
      <nav className={styles['nav-panel']}>
        <ContactList
          contactList={contactList}
          addContact={addContact}
          openedContact={chatId}
        />
      </nav>
      <Outlet />
    </section>
  );
}
