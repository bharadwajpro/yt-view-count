import React from "react";
import $ from "jquery";

export default class VideoLayout extends React.Component{
    constructor(props){
        super();
        this.state = {
          video_thumbnail: './img/default.jpg',
          video_title: 'YT Title',
          video_views: 0,
          video_id: props.vid
        };
        this.genState = this.genState.bind(this);
    }

    componentDidMount(){
        var vid = this.state.video_id;
        $.ajax({
          type: "POST",
          url: 'http://localhost:3000/video',
          dataType: 'json',
          data: {'vid': this.state.video_id}
        }).done(function(data){
            this.setState({
              video_thumbnail: data['thumbnail'],
              video_title: data['title'],
              video_views: data['views'],
              video_id: vid
            });
        }.bind(this));
        this.regularInterval = setInterval(this.genState, 100000);
    }

    componentWillUnmount(){
        clearInterval(this.regularInterval);
    }

    genState() {
        var vid = this.state.video_id;
        $.ajax({
          type: "POST",
          url: 'http://localhost:3000/video',
          dataType: 'json',
          data: {'vid': this.state.video_id}
        }).done(function(data){
            this.setState({
              video_thumbnail: data['thumbnail'],
              video_title: data['title'],
              video_views: data['views'],
              video_id: vid
            });
        }.bind(this));
    }

    render(){
		return(
            <div className="video-info">
                <img src={this.state.video_thumbnail} alt="thumbnail"/>
                <h3>{this.state.video_title}</h3>
                <h4>{this.state.video_views}</h4>
            </div>
		);
	}
}
