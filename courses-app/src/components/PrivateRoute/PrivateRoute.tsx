import { Navigate } from 'react-router-dom';

type PrivateRouteProps = {
	role: string | undefined;
	redirectTo?: string;
	component: JSX.Element;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({
	role,
	redirectTo = '/courses',
	component: Component,
}) => {
	return role === 'admin' ? Component : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
