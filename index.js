function ViewModel() {
    var self = this;
    self.tracks = ko.observableArray([]);
    self.totalTracks = ko.observable(0);
};  

var viewModel = new ViewModel();
ko.applyBindings(viewModel);

$.ajax({
    url: "http://ws.audioscrobbler.com/2.0/",
    dataType: "json",
    data: {
        user: "brunoterragno",
        method: "user.getRecentTracks",
        api_key: "703e6ca649742d617646caf2f806fcfb",
        format: "json",
        page: 1,
        limit: 5
    },
    success: function (result) {       
        if (result.recenttracks != null) {
            viewModel.totalTracks(result.recenttracks["@attr"].total);       
            $.each(result.recenttracks.track, function (index, tr) {
                viewModel.tracks.push(tr);
            });
        }
    },
    error: function(){
        $(".last-fm").hide();
    }
});