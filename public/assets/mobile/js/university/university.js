webpackJsonp([4],[function(i,l,a){var s;(function(t){s=function(i){var l=a(2);l.Getdata(l.url.universitylist,{},function(i){for(var i=i.data.list.data,a=i.length,s="",e=0;e<a;e++)s+='<li class="it clearfix"><a href="'+l.g_param.universitylist_baseUrl+i[e].id+'"><div class="fl pic"><p><img src="'+i[e].logo+'" /></p></div><div class="fl info"><p class="title">'+i[e].schoolname+'</p><p class="teacher">'+i[e].brief+"</p>"+(i[e].professionalselection[0]?'<p class="creatime"><i class="label">'+i[e].professionalselection[0].title+"</i></p>":"")+"</div></a></li>";t("#university").html(s)})}.call(l,a,l,i),!(void 0!==s&&(i.exports=s))}).call(l,a(1))}]);