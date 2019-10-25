$(document).on('turbolinks:load', function(){
  function candidateHTML(user){
    var html =  `
    <div class="chat-group-user clearfix-candidate">
      <p class="chat-group-user__name">${user.user_name}</p>
      <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.user_id}" data-user-name="${user.user_name}">追加</a>
    </div>
    `
    return html;
  }
  $('#user-search-field').on('keyup', function(){
    var input = $(this).val();
    $.ajax({
      url: '/groups/users/search',
      type: "GET",
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users){
      $('#user-search-result').empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          var html = candidateHTML(user);
          $('#user-search-result').append(html);
        })
      } else {
        $('#user-search-result').append(`<div>該当するメンバーはありません</div>`)
      } 
    })
    .fail(function(){
      alert("ユーザー検索は失敗しました");
    })
  })
  function addMemberHTML(user_name, user_id){
    var new_html = `<div class='chat-group-user chat-group-user__indicated'>
                      <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                      <p class='chat-group-user__name'>${user_name}</p>
                      <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                    </div>`
    return new_html;
  }
  $('#user-search-result').on('click', '.chat-group-user__btn--add', function(){
    var user_name = $(this).data('user-name');
    var user_id = $(this).data('user-id');
    var new_html = addMemberHTML(user_name, user_id);     
    $('#user-search-field').val('');
    $('.clearfix-candidate').remove();
    $('.chat-group-form__field--right-name').append(new_html);
  })
  $(document).on('click', '.js-remove-btn', function(){
    $(this).parent().remove();
  })
})
