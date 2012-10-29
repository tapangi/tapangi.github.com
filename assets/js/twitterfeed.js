/*
Twitter Feed Plugin
(c) Schien Dong, Antradar Software Inc.

License: www.antradar.com/license.php
Documentation: www.antradar.com/docs.php?article=twitter-feed-js
*/

function gid(d){return document.getElementById(d);}
function hb(){var now=new Date(); var hb=now.getTime();return hb;}

function gettwitterfeed(viewerid,term){
	var viewer=gid(viewerid);
	viewer.animseq=[-15,-25,-50,-80,-120,-140,-128,-120,-118,-120];
	viewer.animspeed=100;

	if (viewer.attributes.animseq&&viewer.attributes.animseq.value)
		viewer.animseq=viewer.attributes.animseq.value.split(',');
	
	if (viewer.attributes.animspeed&&viewer.attributes.animspeed.value)
		viewer.animspeed=viewer.attributes.animspeed.value;

	self['processfeed_'+viewerid]=function(data){
		viewer.feeddata=data.results;
		viewer.term=term;
        for (var i=0;i<viewer.feeddata.length;i++){
            var text=viewer.feeddata[i].text;
            text=text.replace(/http:\/\/(\S+)/g,'<span class="link"><a target=_blank href="http://$1">http://$1</a></span>');
            text=text.replace(/#(\w+)/g,'<span class="hash"><a target=_blank href="http://twitter.com/search?q=%23$1">#$1</a></span>');
            text=text.replace(/@(\w+)/g,'<span class="user"><a target=_blank href="http://twitter.com/$1">@$1</a>&nbsp;</span>');
            viewer.feeddata[i].text=text;
        }		
		if (viewer.idx==null) {
			viewer.idx=0;
			showfeed(viewerid);
			viewer.onmouseover=function(){viewer.animpause=true;}
			viewer.onmouseout=function(){viewer.animpause=null;}
		}
	}
	var url='http://search.twitter.com/search.json?q='+escape(term)+'&rpp=25&callback=processfeed_'+viewerid+'&_='+hb();
	var sc=document.createElement('script');
	sc.setAttribute('src',url);
	document.body.appendChild(sc);
}

function renderfeedcell(data){
	var text=data.text;
	var author=data.from_user;
	var img=data.profile_image_url;
	var html='<div class="feedcell"><a target=_blank href="http://twitter.com/'+author+'"><img class="authorimg" src="'+img+'"></a><span class="feedtext">'+text+'</span></div>';
	return html;
}

function animatefeed(viewerid){
	var viewer=gid(viewerid);
	var seq=viewer.animseq;
	var speed=viewer.animspeed;

	viewer.style.top=seq[viewer.aidx]+'px';

	viewer.aidx++;
	if (viewer.aidx<seq.length){setTimeout(function(){animatefeed(viewerid);},speed);}			
}

function showfeed(viewerid){
	var viewer=gid(viewerid);
	
	if (viewer.animpause){
		setTimeout(function(){showfeed(viewerid);},5000);
		return;	
	}

	var feeddata=gid(viewerid).feeddata;
	if (!feeddata) return;
	if (feeddata.length==0) return;

	var idxa=(viewer.idx+feeddata.length-1)%feeddata.length;
	var idxb=viewer.idx%feeddata.length;
	var idxc=(viewer.idx+1)%feeddata.length;
	
	views=[];
	
	var renderfunc='renderfeedcell';
	if (self['renderfeedcell_'+viewerid]) renderfunc='renderfeedcell_'+viewerid;
  views.push(self[renderfunc](feeddata[idxa]));
	views.push(self[renderfunc](feeddata[idxb]));
	views.push(self[renderfunc](feeddata[idxc]));

	gid(viewerid).innerHTML=views.join('');

	gid(viewerid).idx++;

	if (gid(viewerid).idx%5==0) gettwitterfeed(viewerid,viewer.term);

	viewer.aidx=0;
	animatefeed(viewerid);
	setTimeout(function(){showfeed(viewerid);},5000);

}
