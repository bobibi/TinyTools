document.getElementsByTagName('body')[0].appendChild(document.createElement('script')).setAttribute('src','http://code.jquery.com/jquery-1.10.2.js');

$('table').dblclick(function(event){
  //console.info($(event.target).parents('table'))
  if (confirm("Download this table as CSV?") != true) return;
  var str = '';
  $(event.target).parents('table').find('tr').each(function(i, r){
    var d = '';
    $(r).find('td').each(function(j, c){
      str += d+$(c).text();
      d = ','
    })
    str += '\n';
  })
  console.info(str);
})
