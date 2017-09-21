;(() => {

class CommentsModalController {
  constructor(CommentsService, $timeout, Auth) {
    this.CommentsService = CommentsService;
    this.$timeout = $timeout;
    this.session = Auth.getSession();
    this.refreshInterval = 1000 * 60 * 15; // 15 min
    this.mycomments =0;
    this.paging = {
      size: 50,
      totalElements: 0,
      page: 1,
      sort: 'createdAt,DESC'
    };
    
    /* Will be used as a cache for replacing all usernames with
    * the format [~username~id] before posting the new comment
    */ 
    this.addedMentions = [];
  }

  $onInit() {
    this.load();

    // Set autorefresh
    this.$timeout(() => {
      if (this.CommentsService.isRefreshing()) {
        this.load();
      }
    }, this.refreshInterval);
  }

  load() {
    this.loadingPromise = this.CommentsService.load(this.resolve.id, this.paging)
      .then((response) => {
        this.comments = response.data;
        // Total elements
        this.paging.totalElements = response.data.totalElements;
      });
  }

  close() {
    this.modalInstance.close(this.mycomments);
    // Not refresh anymore
    this.CommentsService.disableRefreshing(false);
  }

  changePage() {
    this.load();
  }

  comment() {
    this.isSaving = true;

    let _newComment = this.newComment;

    _newComment = _newComment.replace(/@[a-zA-Z0-9]+/g, (match) => {
      let username = match.substring(1);
      let obj = null;

      _.each(this.addedMentions, (val) => {
        if (val.username === username) {
          obj = val;
        }
      });

      if (obj) {
        return `[~${obj.username}~${obj.id}]`;
      }
      else {
        console.warn(`Couldn\'t find user ${match}`);
        return match;
      }
    })

    this.loadingPromise = this.CommentsService.comment(this.resolve.id, _newComment)
      .then((response) => {
        this.newComment = null;
        // Reload
        this.load();
      })
      .finally(() => {
        this.isSaving = false;
      });
  }

  emptyComments() {
    return _.isUndefined(this.comments) || this.paging.totalElements === 0;
  }

  typeaheadUsers(term) {
    this.acUsers = [];

    if (term.length >= 1) {
      this.CommentsService.typeaheadUsers(term).then((response) => {
        this.acUsers = response.data;
      })
    }
  }

  selectUser(item) {
    this.addedMentions.push(item);
    return `@${item.username}`;
  }
}

angular.module('app')
  .component('commentsModal', {
    templateUrl: 'app/directives/comments/comments.modal.html',
    controller: CommentsModalController,
    bindings: {
      modalInstance: '<',
      resolve: '<',
    }
  });

})();
