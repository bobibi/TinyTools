document.getElementsByTagName('body')[0].appendChild(document.createElement('script')).setAttribute('src','http://code.jquery.com/jquery-1.10.2.js');

$('table').dblclick(function(event){
  //console.info($(event.target).parents('table'))
  if (confirm("Download this table as CSV?") != true) return;
  var title = '';
  var x = $(event.target).closest('table');
  while(x) {
    console.info(x)
    if(x.prev(':header')) {
      console.info('TITLE')
      title = x.prev(':header').text();
      break;
    }
    x = x.parent();
  }
  var str = '';
  $(event.target).closest('table').find('tr').each(function(i, r){
    var d = '';
    $(r).find('td,th').each(function(j, c){
      str += d+$(c).text();
      d = ','
    })
    str += '\n';
  })
  console.info(title);
  console.info(str);
})

console.info('Tool loaded!')
