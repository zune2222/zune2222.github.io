'use client';
import Image from 'next/image';
import { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
export default function DynamicBurger() {
	const [currentMode, setCurrentMode] = useState(false);
	const springs = useSpring(
		currentMode === false
			? {
					config: {
						tension: 300,
						mass: 0.1,
					},
					width: '4rem',
					height: '4rem',
			  }
			: {
					config: {
						tension: 250,
						mass: 2,
					},
					width: '16rem',
					height: '8rem',
			  }
	);
	const handleClick = () => {
		setCurrentMode(!currentMode);
	};
	return (
		<div className="fixed w-full top-0">
			<div className="flex flex-col p-3 min-h-screen justify-start items-center">
				<animated.div
					onClick={handleClick}
					style={springs}
					className="cursor-pointer rounded-full flex-initial shadow-xl p-3 mb-3  bg-gradient-to-r from-cyan-500 to-blue-500"
				></animated.div>
			</div>
		</div>
	);
}