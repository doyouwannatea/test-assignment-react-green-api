import { useAuthContext } from '@/context/auth-context/AuthContext';
import BaseButton from './BaseButton';

export default function AppHeader() {
  const authContext = useAuthContext();

  return (
    <div>
      <span>WhatsAPPP</span>
      {authContext.data && (
        <BaseButton onClick={() => authContext.logout()}>
          выйти из аккаунта
        </BaseButton>
      )}
    </div>
  );
}
