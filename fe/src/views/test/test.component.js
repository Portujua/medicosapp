;(() => {

class TestController {
  constructor(RESTful, StorageService, RootService, toastr, PromptService, SidebarService, $timeout, NgTableParams) {
    this.RESTful = RESTful;
    this.greetings = RootService.greeting('Scaffolar');
    this.toastr = toastr;
    this.PromptService = PromptService;
    this.SidebarService = SidebarService;
    this.$timeout = $timeout;

    toastr.success('Hello world!', 'Toastr fun!');

    StorageService.put('myKey', 1999);

    this.translate = '¡Hola mundo!';

    let data = [{ name: 'Moroni', age: 30 }, { name: 'Loroni', age: 20 }, { name: 'Aroni', age: 50 }];
    this.tableParams = new NgTableParams({}, { dataset: data, counts: [] });
  };

  $onInit() {
    this.SidebarService.add({
      name: 'An option',
      icon: 'fa-star',
      order: 0,
      callback: () => this.open(),
      module: 'admin',
      permission: 'admin',
    })
    .add({
      name: 'An option',
      icon: 'fa-check',
      route: 'root.test',
      order: 1,
      id: 'something',
    })
    .add({
      name: 'An option',
      icon: 'fa-home',
      route: 'root.test',
      order: 3,
      id: 'something1',
    })
    .add({
      name: 'An option',
      icon: 'fa-plus',
      type: 'button',
      callback: () => this.remove(),
      order: 0,
      id: 'my',
      promise: this.$timeout(() => {}, 5000),
      isDisabled: true,
      isFixed: true,
    })
    .add({
      name: 'An option',
      icon: 'fa-warning',
      type: 'button',
      callback: () => this.open(),
      order: -1,
      isFixed: true,
    });
  };

  remove() {

    let promise = this.$timeout(() => {}, 5000)
      .then((response) => {

      }).finally(() => {

      });


    this.SidebarService.getByPosition(1, 'button').setPromise(promise);
    // this.thePromise = this.$timeout(() => {}, 5000);
    // this.SidebarService.removeByPosition(1);
    // this.SidebarService.getByPosition(1).icon = 'fa-spin fa-spinner';
    // this.SidebarService.add({
    //   name: 'An option',
    //   icon: 'fa-file-o',
    //   order: 2,
    //   callback: () => this.open(),
    // });
  }

  open() {
    this.PromptService.open({ text: '<b>Lorem ipsum dolor sit amet</b>, consectetur adipisicing elit. Autem eos, eligendi numquam dolorum, molestiae quos suscipit. Nostrum aliquid laudantium accusantium atque voluptatem placeat incidunt fugit fuga quibusdam. Deserunt, velit, quod.', comfirmButtonText: 'Ok', size: '35p', inputs: [{
      type: 'textarea',
      map: 'lalal'
    }, {
      type: 'number'
    }] })
      .then((response) => {

      }, (response) => {

      }).finally(() => {

      });
  }

  something() {
    this.toastr.success('Hello world!!!', 'Toastr fun!');
    this.toastr.error('Hello world!', 'Toastr fun!');
    this.toastr.warning('Hello world! (again)', 'Toastr fun!');
    this.toastr.info('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae possimus dicta, laboriosam iusto animi eos voluptatibus, nemo laborum voluptatem rem pariatur molestiae obcaecati sint magni deserunt ullam nam quis perspiciatis!', 'Toastr fun!');
  }
}

angular.module('app')
  .component('test', {
    templateUrl: 'views/test/test.html',
    controller: TestController,
  });

})();
