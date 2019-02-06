export default {
  items: [
    {
      name: 'Приборная доска',
      url: '/Dashboard',
      icon: 'icon-speedometer',
    },
    {
      title: true,
      name: 'Виджеты',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Сообщения',
      url: '/underconstruction',
      icon: 'icon-bell',
    },
    {
      name: 'Календарь',
      url: '/underconstruction',
      icon: 'icon-calendar',
    },
    {
      title: true,
      name: 'Управление пользователями',
      wrapper: {
        element: '',
        attributes: {},
      },
    },
    {
      name: 'Сотрудники',
      url: '/employees',
      icon: 'icon-people',
      children: [
        {
          name: 'Зарегистрировать',
          url: '/employees/register',
          icon: 'icon-user-follow',
        },
        {
          name: 'Список сотрудников',
          url: '/employees',
          icon: 'icon-list',
        },
      ],
    },
    {
      name: 'Руководители',
      url: '/supervisors',
      icon: 'icon-people',
      children: [
        {
          name: 'Зарегистрировать',
          url: '/supervisors/register',
          icon: 'icon-user-follow',
        },
        {
          name: 'Список руководителей',
          url: '/supervisors',
          icon: 'icon-list',
        },
      ],
    },
  ],
};
