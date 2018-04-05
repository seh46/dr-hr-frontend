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
			"data": {"time": [0], "hr": [0]},
			"nameTextField": "",
			"nameToSearch": "",
			"time": [],
			"hr": [],
			"datapairs": [],
		};
		this.onNameTextFieldChange.bind(this)
		this.onButtonClick.bind(this)
		this.DataFromServer.bind(this)
		this.dataTable.bind(this)
	}

	onNameTextFieldChange = (event) => {
		this.setState({"nameTextField": event.target.value});
	}

	onButtonClick = (event) => {
		console.log(this.state.nameTextField);
		this.setState({"nameToSearch": this.state.nameTextField})
		this.DataFromServer()
	}

	DataFromServer = () => {
		axios.get('http://67.159.95.29:5000/api/heart_rate/' + this.state.nameToSearch).then( (response) => {
			console.log(response.status);
			this.setState({"data": response.data});
			console.log(this.state.data)
			console.log(this.state.data["time"])
			console.log(this.state.data.hr)
			console.log(this.state.data.hr[1])
		});
		this.dataTable()
	}

	dataTable = () => {
		var a = [];
		for (var i = 0; i < this.state.data.length; i++) {
			a.push(
				<TableRow>
					<TableCell>{this.state.data.time[i]}</TableCell>
					<TableCell>{this.state.data.hr[i]}</TableCell>
				</TableRow>
			);
		}
		return a
	}

	render() {
		var a = this.dataTable();
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
				<div>
					{this.nameTextField}
					{this.nameToSearch}
					{this.data}
					{this.time}
					{this.hr}
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
							{a}
						</TableBody>
					</Table>
				</Paper>
			</div>
		)
	}

}

export default FetchData