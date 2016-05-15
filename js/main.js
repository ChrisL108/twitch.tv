let streamers = ["freecodecamp", "storbeck", "terakilobyte",
 "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff",
 "ESL_SC2", "OgamingSC2", "cretetion"]

streamers.forEach(function(streamer) {
	$.getJSON(makeURL('users', streamer), function(data) {

		$.getJSON(makeURL('streams', data.name), function(streamData) {

			let userLogo = data.logo || "https://www.dropbox.com/s/kvpa4zblg78mgux/avatar.png?raw=1" ;
			let userName = data.display_name;
			let userBio = data.bio;
			
			if (streamData.stream !== null) {
				var streaming = true,
					streamInfo =  streamData.stream.game +
				"---" + streamData.stream.channel.status;
			} else {
				var streaming = false,
					streamInfo = "Offline";
			}

			createUser(userName, streamInfo, userLogo, streaming);
		});
	});
	
});

function createUser(name, info, logo, streaming) {
	let newListItem = "<li class='stream-item'>" +
					  "<img src ='"+ logo +"' class='user-logos'> " +
					  "<h4><a href='https://www.twitch.tv/" + name + "'>" +
					  name + "</a></h4>" +
					  "<span class='stream-info'>" + info +
					  "</span></li>";
	$("#streamers").prepend(newListItem);
}

function makeURL(type, name) {
  return 'https://api.twitch.tv/kraken/' +
  		 type + '/' + name + '?callback=?';
}



