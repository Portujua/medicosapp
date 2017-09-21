;(() => {

class CommentsViewController {
  constructor(CommentsService, $interval, Auth) {
    this.CommentsService = CommentsService;
    this.$interval = $interval;
    this.session = Auth.getSession();
    this.refreshInterval = 1000 * 10; // 10 sec
    this.paging = {
      size: 25,
      totalElements: 0,
      page: 1,
      sort: 'createdAt,ASC'
    };
  }

  $onChanges(changes) {
    if (_.isEmpty(this.id)) {
      return;
    }

    this.load();

    // Set autorefresh
    this.$interval(() => {
      this.load();
    }, this.refreshInterval);
  }

  load() {
    this.CommentsService.load(this.id, this.paging)
      .then((response) => {
        this.comments = response.data.content;

        // Total elements
        this.paging.totalElements = response.data.totalElements;
      });
  }

  close() {
    this.modalInstance.close('Close');
    // Not refresh anymore
    this.CommentsService.disableRefreshing(false);
  }

  changePage() {
    this.load();
  }

  comment() {
    this.isSaving = true;

    this.loadingPromise = this.CommentsService.comment(this.id, this.newComment)
      .then((response) => {
        this.newComment = null;
        // Reload
        this.load();
      })
      .finally(() => {
        this.isSaving = false;
      });
  }
}

angular.module('app')
  .component('commentsView', {
    templateUrl: 'app/directives/comments/comments.view.html',
    controller: CommentsViewController,
    bindings: {
      id: '@',
    }
  });

})();
