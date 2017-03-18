import React from "react";
import ReactDOM from "react-dom";
import VideoLayout from './components/VideoLayout';

class Layout extends React.Component{
	genLayout(id_arr){
		var vl_arr = [];
		for(var x=0; x<id_arr.length; x++){
			vl_arr.push(
				<VideoLayout vid={id_arr[x]}/>
			);
		}
		return vl_arr;
	}

	render(){
		return(
			<div>
				{this.genLayout(this.props.video_id)}
			</div>
		);
	}
}

const app = document.getElementById('app');

ReactDOM.render(<Layout video_id={['qD-6d8Wo3do', 'G62HrubdD6o', 'X4hEii_WRPA']}/>, app);
