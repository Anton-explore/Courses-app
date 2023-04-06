import { Button } from '../../common/Button/Button';

import { BUTTONS_TEXT } from '../../constants';
import { useSharedState } from '../../hooks/useSharedState';

import { Logo } from './components/Logo/Logo';

import {
	StyledHeaderWrapper,
	StyledLogoWrapper,
	StyledUserInfoWrapper,
} from './Header.style';

const Header: React.FC = () => {
	const { userName, handleLogout } = useSharedState();

	return (
		<StyledHeaderWrapper>
			<StyledLogoWrapper>
				<Logo />
			</StyledLogoWrapper>
			{userName && (
				<StyledUserInfoWrapper>
					<p>{userName}</p>
					<Button text={BUTTONS_TEXT.OUT} onClick={handleLogout} />
				</StyledUserInfoWrapper>
			)}
		</StyledHeaderWrapper>
	);
};

export default Header;
