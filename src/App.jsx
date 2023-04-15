import React, { useEffect } from 'react';
import { Route, Router } from 'react-router-dom';
import './App.css';
import Clips from './components/Clips/Clips';
import AOS from 'aos';

function App() {
	// Initialise the ANIMATE ON SCROLL library
	useEffect(() => {
		AOS.init();
	}, []);

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
