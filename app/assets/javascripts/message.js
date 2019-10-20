$(document).on('turbolinks:load', function() {
  function buildHTML(message){
    if (message.image_url !== null){
      var html = `<div class="message">
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                        ${message.user_name}
                      </div>                      
                      <div class="upper-message__date">
                        ${message.created_at}
                      </div>          
                    </div>
                    <div class="lower-message">
                      <p class="lower-message__content">
                        ${message.content} 
                      </p>                      
                      <img src="${message.image_url}" class='lower-message__image'>
                    </div>
                  </div>`
    }else{      
      var html = `<div class="message">
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                        ${message.user_name}                        
                      </div>
                      <div class="upper-message__date">
                        ${message.created_at}
                      </div>                      
                    </div>
                    <div class="lower-message">
                      <p class="lower-message__content">
                        ${message.content} 
                      </p>
                   </div>
                  </div>`;
    }
    return html;
  }

  $('.new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this); 
    var url = $(this).attr('action')

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
      $('.messages').append(html)
      $('.form__message').val('')
      $('#message_image').val('')
      $('.messages').animate({
        scrollTop: $('.messages')[0].scrollHeight
      })
    })

    .fail(function(){
      alert('error');
    })

    .always(function(){
      $('.form__submit').removeAttr('disabled');
    })
  })
});