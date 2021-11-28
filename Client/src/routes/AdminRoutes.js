import { HomeOutlined } from '@ant-design/icons';
import Home from '../page/Home';
import NotFound from '../page/NotFound';
const routes = [
  {
    path: '/',
    exact: true,
    page: <Home />,
  },
  {
    path: '*',
    page: <NotFound />,
  },
];
const menuItems = {
  path: '/',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: <Home />,
      icon: <HomeOutlined />,
    },
  ],
};
export { routes, menuItems };
