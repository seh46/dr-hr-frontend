import React from 'react';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Table, {TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper'

class FetchData extends React.Component {
	constructor() {
		super();
		this.state = {
			"data": [],
			"time": [],
			"hr": [],
			"nameTextField": "",
			"nameToSearch": "",
		};
		this.onNameTextFieldChange.bind(this)
		this.onButtonClick.bind(this)
		this.DataFromServer.bind(this)
		//this.FormatDataTable.bind(this)
	}

	onNameTextFieldChange = (event) => {
		this.setState({"nameTextField": event.target.value});
	}

	onButtonClick = (event) => {
		console.log(this.state.nameTextField);
		this.setState({"nameToSearch": this.state.nameTextField})
	}

	DataFromServer = () => {
		axios.get("http://67.159.95.29:5000/api/heart_rate/" + this.state.nameToSearch).then( (response) => {
			console.log(response.status);
			this.setState({"data": response.data});
		});
		//this.FormatDataTable()
	}

	//FormatDataTable = () => {
		//var datapieces = JSON.parse(this.state.data);
		//var a = [];
		//for (var i = 0; i < this.state.time.length; i++) {
			//a.push([this.state.time[i], this.state.hr[i]]);
		//}
		//this.setState({"datapairs": a})
		//console.log(this.state.datapairs);
	//}

	dataTable = () => {
		var a = [];
		for (var i = 0; i < this.state.data.length; i++) {
			a.push(
				<TableRow>
					<TableCell>{this.state.data[i]}</TableCell>
				</TableRow>
			)
		}
		return a
	}

	render() {
		return (
			<div>
				<div>
					<TextField 
						value={this.state.nameTextField}
						onChange={this.onNameTextFieldChange}/>
					<Button onClick={this.onButtonClick}>
						Get Heart Rate Data
					</Button>
				</div>
				<div onClick={this.DataFromServer}>
				</div>
				<Paper>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Time</TableCell>
								<TableCell>HR</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{this.dataTable()}
						</TableBody>
					</Table>
				</Paper>
			</div>
		)
	}

}

export default FetchData