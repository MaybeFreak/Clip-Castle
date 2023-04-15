import { Route, Router } from 'react-router-dom';
import './App.css';
import Clips from './components/Clips/Clips';

function App() {
	return (
		<div className='App'>
			{/* <Router>
				<Route></Route>{' '}
			</Router> */}
			<Clips />
		</div>
	);
}

export default App;
