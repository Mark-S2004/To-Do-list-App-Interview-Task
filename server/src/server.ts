import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import TasksRoute from '@routes/tasks.route';
import validateEnv from '@utils/validateEnv';
import UsersRoute from './routes/users.route';

validateEnv();

const app = new App([new IndexRoute(), new TasksRoute(), new AuthRoute(), new UsersRoute()]);

app.listen();
