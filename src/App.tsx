import { useEffect } from 'react';
import { fetchTasks } from './state/tasks/actions';
import { useAppDispatch } from './state/hooks';
import CalendarGrid from './components/Calendar/CalendarGrid'

import { Header } from './components/Header/Header'
import './App.css'

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <>
      <Header />
      <CalendarGrid />
    </>
  )
}

export default App
