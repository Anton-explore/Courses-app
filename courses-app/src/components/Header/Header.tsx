import { Button } from '../../common/Button/Button';
import { Logo } from './components/Logo/Logo';

const Header = () => {
	return (
		<header>
			<Logo />
			<p>Gregor</p>
			<Button text='Tap me' onClick={() => console.log('You tapped me!')} />
		</header>
	);
};

export default Header;
