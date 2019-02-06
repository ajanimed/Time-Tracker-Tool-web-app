import DefaultLayout from './containers/DefaultLayout';
import Employees from "./views/Pages/Employees/Employees";
import RegisterEmployee from "./views/Pages/Employees/RegisterEmployee";
import EmployeeProfile from "./views/Pages/Employees/EmployeeProfile"
import Supervisors from "./views/Pages/Supervisors/Supervisors";
import RegisterSupervisor from "./views/Pages/Supervisors/RegisterSupervisor";
import UnderConstruction from "./views/Pages/UnderConstruction/UnderConstruction"



// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Главное', component: DefaultLayout },
  { path: '/dashboard', name: 'Приборная доска', component: UnderConstruction },
  { path: '/underconstruction' , name : 'В разработке' , component: UnderConstruction},
  { path: '/employees/register' , name: 'Зарегистрировать нового сотрудника' , component: RegisterEmployee},
  { path: '/employees/:id', name: 'Cотрудник' , component: EmployeeProfile},
  { path: '/employees' , name:'Список сотрудников',component: Employees},
  { path: '/supervisors/register' , name: 'Зарегистрировать нового руководителя' , component: RegisterSupervisor},
  { path: '/supervisors' , name:'Список сотрудников',component: Supervisors},
];

export default routes;
