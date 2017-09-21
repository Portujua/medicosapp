;(() => {

class FinancesService {
  constructor() {

  }

  // getSidebarButton() {
  //   return {
  //     title: 'Finances',
  //     icon: 'fa-usd',
  //     color: 'color-6',
  //     tab: {
  //       id: 'financesView',
  //       title: 'Finances',
  //       component: 'financesView',
  //       color: 'color-6'
  //     },
  //   };
  // }
};

angular.module('app')
  .service('FinancesService', FinancesService);

})();
