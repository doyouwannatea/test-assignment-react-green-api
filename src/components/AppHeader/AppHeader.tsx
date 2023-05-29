import { Link } from 'react-router-dom';
import { useAuthContext } from '@/context/auth-context/AuthContext';
import BaseButton from '../BaseButton';
import { routeLocations } from '@/router/routes';
import styles from './AppHeader.module.scss';

export default function AppHeader() {
  const authContext = useAuthContext();

  return (
    <header className={styles.header}>
      <Link className={styles.logo} to={routeLocations.homePageLocation}>
        WhatsAPPP
      </Link>
      {authContext.data && (
        <BaseButton onClick={() => authContext.logout()}>
          выйти из аккаунта
        </BaseButton>
      )}
    </header>
  );
}
