(() => {
  
  class ChatImageViewController {
    constructor($scope) {
      console.log($scope)
    }

    $onInit() {
      this.imageHtml = this.resolve.imageHtml;
    }
  }
  
  angular.module('app')
    .component('chatViewImage', {
      templateUrl: 'views/chats/chats.image.view.html',
      controller: ChatImageViewController,
      controllerAs: '$ctrl',
      bindings: {
        modalInstance: '<',
        resolve: '<',
      }
    });
  
  })();
  