import { useApplicationState } from '../contexts/ApplicationContext';

export const useToggleUserDrawer = () => {
  const [state, setState] = useApplicationState();
  const toggleUserDrawer = () => {
    setState(prev => ({
      ...prev,
      userDrawerOpen: !state.userDrawerOpen,
    }));
  };
  return toggleUserDrawer;
};
