import LandingPage from './views/home';
import Overview from './views/overView';

export const routes = [
    { path: '/', component: LandingPage},
    { path: '/overview', component: Overview, name:'overview'},
];