import BaseLayout from './components/BaseLayout/BaseLayout';
import AuthContextProvider from './context/auth-context/AuthContextProvider';
import AppRouter from './router/AppRouter';

function App() {
  return (
    <AuthContextProvider>
      <BaseLayout>
        <AppRouter />
      </BaseLayout>
    </AuthContextProvider>
  );
}

export default App;
