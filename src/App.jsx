import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import NavBar from './components/NavBar';
import NotFound from './components/NotFound';
import Users from './components/Users';
import UserTodos from './components/UserTodos';
	


function App() {
  return (
    <>
			<NavBar />
			<Routes>
        <Route path="/" element={<HomePage />} />
				<Route path="/users" element={<Users />} />		
				<Route path="/user-todos/:userId" element={<UserTodos />} />
				<Route path="*" element={<NotFound />} />				
      </Routes>
    </>
  );
}

export default App;