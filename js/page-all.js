    $(function(){
      var layout = 'https://resepmoe.s3.us-east-2.amazonaws.com/views/layout/';
      var guest = 'https://resepmoe.s3.us-east-2.amazonaws.com/views/guest/';
      var member = 'https://resepmoe.s3.us-east-2.amazonaws.com/views/member/';
      
      var header = $('[data-header]');
      jQuery.each(header, function(){
        var file = layout + $(this).data('header') + '.html';
        $(this).load(file);
      });

      var body = $('[data-body]');
      jQuery.each(body, function(){
        var file = guest + $(this).data('body') + '.html';
        $(this).load(file);
      });

      var footer = $('[data-footer]');
      jQuery.each(footer, function(){
        var file = layout + $(this).data('footer') + '.html';
        $(this).load(file);
      });
    });