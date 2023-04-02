import { useContext } from 'react';
import { SharedContext } from '../App';

export const useSharedState = () => {
	let context = useContext(SharedContext);

	if (context === undefined) {
		throw Error('Component must be used inside of a context');
	}
	return context;
};
