(() => {
  
  class ChatViewController {
    constructor(Auth, AreaService, UserService, ChatService, ChatMessage, $timeout, $interval) {
      this.Auth = Auth;
      this.AreaService = AreaService;
      this.UserService = UserService;
      this.ChatService = ChatService;
      this.ChatMessage = ChatMessage;
      this.self = Auth.getSession();
      this.$timeout = $timeout;
      this.$interval = $interval;

      this.REQUEST_INTERVAL = 5000;
      this.messages = [];
    }

    $onInit() {
      this.data = new this.ChatMessage({ });
      this.load();
    }

    load() {
      this.loadingPromise = this.AreaService.get(this.area).then((response) => {
        this.area = response.data;
        this.data.area = this.area;

        this.loadingPromise = this.UserService.get(this.user)
          .then((response) => {
            this.user = response.data;
            this.data.user = this.user;

            this.loadMessages()
          })
      })
    }

    loadMessages(page = 0) {
      this.loadingPromise = this.ChatService.listMessages(this.area, this.user, page)
        .then((response) => {
          this.lastPage = response.data.page;
          this.messages = _.union(this.messages, response.data.content);

          // If page is 0 then activate the interval
          if (page === 0) {
            this.$interval(() => {
              this.ChatService.listUnread(this.area, this.user)
                .then((response) => {
                  this.messages = _.union(this.messages, response.data);
                })
            }, this.REQUEST_INTERVAL)
          }
        })
    }

    send(event) {
      // Check for enter key pressed
      if (event) {
				if (event.keyCode == 13) {
          this.send();
        }
				return;
      }
      
      // Send the message
      this.messages.push(angular.copy(this.data));
      this.reset();

      // Save the current added index as local variable to update message status
      let insertedIndex = this.messages.length - 1;

      this.ChatService.send(this.data.postPayload())
        .then((response) => {
          this.messages[insertedIndex] = response.data;
          // do scroll down
        })
    }

    reset() {
      this.$timeout(() => {
        this.data.html = '';
      })
    }

    // Copied from last app
    scrollDown() {
			this.$timeout(() => {
				//Auto-scroll			
				var newscrollHeight = 0;

				$(".message").each((i, m) => {
					newscrollHeight += parseInt($(m).css('height'));
				})
				
				$(".chat-history").animate({ scrollTop: newscrollHeight }, 0); //Autoscroll to bottom of div
			}, 100);
		}
  }
  
  angular.module('app')
    .component('chatsView', {
      templateUrl: 'views/chats/chats.view.html',
      controller: ChatViewController,
      controllerAs: '$ctrl',
      bindings: {
        user: '@',
        area: '@',
        tabId: '@',
      }
    });
  
  })();
  