    $(function(){
      var location = './views'+$('[data-type]');+'/';
      //var guest = './views/guest/';
      //var member = './views/member/';
      var header = $('[data-header]');
      jQuery.each(header, function(){
        var file = location + $(this).data('header') + '.html';
        $(this).load(file);
      });
      var body = $('[data-body]');
      jQuery.each(body, function(){
        var file = location + $(this).data('body') + '.html';
        $(this).load(file);
      });
      var footer = $('[data-footer]');
      jQuery.each(footer, function(){
        var file = location + $(this).data('footer') + '.html';
        $(this).load(file);
      });
    });