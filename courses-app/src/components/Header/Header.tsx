import { Button } from '../../common/Button/Button';
import { BUTTONS_TEXT, USER_NAME } from '../../constants';
import { Logo } from './components/Logo/Logo';
import {
	StyledHeaderWrapper,
	StyledLogoWrapper,
	StyledUserInfoWrapper,
} from './Header.style';

const Header = () => {
	return (
		<StyledHeaderWrapper>
			<StyledLogoWrapper>
				<Logo />
			</StyledLogoWrapper>
			<StyledUserInfoWrapper>
				<p>{USER_NAME}</p>
				<Button
					text={BUTTONS_TEXT.OUT}
					onClick={() => console.log('You tapped me!')}
				/>
			</StyledUserInfoWrapper>
		</StyledHeaderWrapper>
	);
};

export default Header;
