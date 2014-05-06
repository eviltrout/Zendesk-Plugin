Discourse.ZendeskButton = Discourse.ButtonView.extend({
  shouldRerender: Discourse.View.renderIfChanged('controller.zendeskTicket.exists'),

  classNames: ['zendesk'],
  classNameBindings: ['controller.zendeskTicket.css_class'],
  titleBinding: 'controller.zendeskTicket.title',
  textBinding: 'controller.zendeskTicket.text',

  click: function() {
    if (this.get('controller.zendeskTicket.exists')) {
      this.get('controller').send('redirectToZendesk', this.get('controller.zendeskTicket.url'));
    } else {
      this.get('controller').send('sendToZendesk', this.get('controller.postStream.posts'), this.get('controller.currentUser'));
    }
  },

  renderIcon: function(buffer) {
    buffer.push("<i class='fa fa-ticket'></i>");
  }
});

Discourse.TopicFooterButtonsView.reopen({
  addAlertButton: function() {
    if (this.get('controller.currentUser.staff')) {
      this.attachViewClass(Discourse.ZendeskButton);
    }
  }.on("additionalButtons")
});