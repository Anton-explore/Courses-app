import { StyledWrapper } from './App.style';
import Courses from './components/Courses/Courses';
import Header from './components/Header/Header';

function App() {
	return (
		<StyledWrapper>
			<Header />
			<Courses />
		</StyledWrapper>
	);
}

export default App;
