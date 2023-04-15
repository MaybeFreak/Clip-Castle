import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './ClipsStyle.css';

gsap.registerPlugin(ScrollTrigger);

const Clips = () => {
	const containerRef = useRef(null);

	useEffect(() => {
		const container = containerRef.current;

		gsap.from(container.children, {
			opacity: 0,
			y: 50,
			stagger: 0.2,
			duration: 0.5,
			scrollTrigger: {
				trigger: container,
				start: 'top 80%',
			},
		});
	}, []);

	return (
		<>
			<h1>Clips</h1>
			<div
				className='clipsContainer'
				ref={containerRef}>
				{[...Array(20)].map((item, i) => (
					<div
						key={i}
						className='clipContainer'>
						<h2 style={{ marginTop: 0 }}>Clip Title {i}</h2>
						<video
							src={`https://example.com/clips/${i}.mp4`}
							style={{
								width: '100%',
								objectFit: 'cover',
							}}
							controls
						/>
						<div
							style={{
								position: 'absolute',
								bottom: -25,
								left: 0,
								display: 'flex',
							}}>
							{[...Array(2)].map((item, i) => (
								<div
									key={i}
									className='tag'>
									<p>🤣</p>
								</div>
							))}
						</div>
						<div
							style={{
								position: 'absolute',
								bottom: -23,
								right: 0,
								display: 'flex',
								backgroundColor: '#DC1A21',
								borderRadius: 50,
								gap: '.5rem',
							}}>
							{[...Array(2)].map((item, i) => (
								<div
									key={i}
									style={{
										borderRadius: '50px',
										padding: 10,
										lineHeight: 0,
										fontSize: '1.6rem',
										cursor: 'pointer',
									}}>
									<i className='fa-solid fa-share clipBtn'></i>
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export default Clips;
