import Index from "../pages/Index.vue";
import Team from "../pages/TeamPage.vue";
import UserPage from "../pages/UserPage.vue";
import UserUpdatePage from "../pages/UserUpdatePage.vue";
import UserTeamJoinPage from "../pages/UserTeamJoinPage.vue";
import UserTeamCreatePage from "../pages/UserTeamCreatePage.vue";
import Search from "../pages/SearchPage.vue";
import UserEditPage from "../pages/UserEditPage.vue";
import UserLoginPage from "../pages/UserLoginPage.vue";
import SearchResult from "../pages/SearchResultPage.vue";
import teamAddPage from "../pages/TeamAddPage.vue";
import teamUpdatePage from "../pages/TeamUpdatePage.vue";


const routes = [
    {path: '/', component: Index},
    {path: '/team', component: Team},
    {path: '/team/add', component: teamAddPage},
    {path: '/team/update', component: teamUpdatePage},
    {path: '/user', component: UserPage},
    {path: '/search', component: Search},
    {path: '/user/edit', component: UserEditPage},
    {path: '/user/list', component: SearchResult},
    {path: '/user/login', component: UserLoginPage},
    {path: '/user/update', component: UserUpdatePage},
    {path: '/user/team/join', component: UserTeamJoinPage},
    {path: '/user/team/create', component: UserTeamCreatePage},
]

export default routes
