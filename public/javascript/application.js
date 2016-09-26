$(function(){

  $('button.submit-image').on('click', function(e){
    $('form.submission').removeClass('hidden');
    $('form.search-image').addClass('hidden');
  });

  $('button.search-images').on('click', function(e){
    $('form.search-image').removeClass('hidden');
    $('form.submission').addClass('hidden');
  });

  var addImage = function(image){
    $new_image = $('.image.dummy')
                    .clone()
                    .removeClass('dummy')
                    .appendTo('.images');

    $new_image.find('.img_url').attr('src', image.img_url);
    $new_image.find('.author').text(image.author);
    $new_image.find('.description').text(image.description);
    $new_image.find('.delete').attr('data-id', image.id);
    }
  

  $('button.show-images').on('click', function(e){

    $('.image').not('.dummy').remove();

    $.ajax({
      url: '/api/show',
      method: 'GET',
      dataType: 'json',
    }).done(function(images){
        images.forEach(function(image){
          addImage(image);
      });
        console.log("Success");

      }).fail(function(jqXHR, textStatus){
        console.log("Failed because: "+ jqXHR.textStatus);

      }).always(function(){
        console.log("Always");
    });      
  });

  $(function(){
    $('form').on('submit', function(e){
      e.preventDefault();

      var author = $('form').find('#author').val();
      var img_url = $('form').find('#img_url').val();
      var description = $('form').find('#description').val();
      var image = { author: author, img_url: img_url, description: description }
      console.log(image)
      $.ajax({
        url: '/api/new',
        method: 'POST',
        dataType: 'json',
        data: { image: image}
        
        }).done(function(image){
          console.log("Success");
          console.log(image);
          addImage(image);

        }).fail(function(jqXHR, textStatus){
          console.log("Failed because: "+ jqXHR.textStatus);
        }).always(function(){
          console.log("Always");
        });
      });
    });

  $(function(){
    
    $('body').on('click','.delete', function(e){
      
      var $image_container = $(this).parent().parent();
      var image_id = $(this).data('id');
      $.ajax({
        url: '/api/image',
        method: 'DELETE',
        dataType: 'json',
        data: { id: image_id },
        success: function(){
          $image_container.remove();
          console.log('successful')
        }
      });
    });
  });
});
