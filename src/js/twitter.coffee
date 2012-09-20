renderfeedcell_tweets = (data) ->
  text=data.text
  author=data.from_user
  img=data.profile_image_url
  html='<div class="feedcell"><a target=_blank href="http://twitter.com/' + author + '"><img class="authorimg" src="' + img + '"></a><span class="feedtext">' + text + '</span></div>'
