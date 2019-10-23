$(document).on('turbolinks:load', function(){
  function buildHTML(message){
      var contentHTML = (message.content !== null) ? `<p class="lower-message__content">
                                                        ${message.content}
                                                      </p>`: `<p></p>`;
      var message_image = (message.image_url !== null) ? `<img src="${message.image_url}" class='lower-message__image'>` : `<p></p>`;
      var html = `<div class="message" data-message-id="${message.id}">
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                        ${message.user_name}
                      </div>                      
                      <div class="upper-message__date">
                        ${message.created_at}
                      </div>          
                    </div>
                    <div class="lower-message">
                      ${contentHTML}        
                      ${message_image}
                    </div>
                  </div>`
      return html;
  }
  $('.new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this); 
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.new_message')[0].reset();
      $('.messages').animate({
        scrollTop: $('.messages')[0].scrollHeight
      })
    })
    .fail(function(){
      alert('error');
    })
    .always(function(){
      $('.form__submit').removeAttr('disabled')
    })
  })
  $(function(){
    var group_id = window.location.href.match(/\/groups\/\d+\/messages/);
    var reloadMessages = function(){
      var last_message_id = $('.message:last').data('message-id');
      $.ajax({
        url: 'api/messages',
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id, group_id: group_id}
      })
      .done(function(messages){
        if (messages !== null) {
          messages.forEach(function(message){
          $('.messages').append(buildHTML(message));
          })
          $('.messages').animate({
            scrollTop: $('.messages')[0].scrollHeight
          })
        }
      })
      .fail(function(){
        alert('error');
      });
    }
    setInterval(reloadMessages, 1500);
  })
});

