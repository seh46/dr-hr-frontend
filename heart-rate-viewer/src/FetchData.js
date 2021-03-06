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
		};
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
		var URL = 'http://67.159.95.29:5000/api/heart_rate/' + this.state.nameToSearch
		console.log(URL)
		axios.get(URL).then( (response) => {
			this.setState({"data": response.data});
			console.log(this.state.data["time"])
			console.log(this.state.data.hr)
		});
	}

	dataTable = () => {
		var a = [];
		for (var i = 0; i < this.state.data.time.length; i++) {
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
		console.log(a)
		return (
			<div>
				<div>
					Enter an email address to retrieve the respective user's heart rate measurements.
				</div>
				<div>
					<TextField 
						value={this.state.nameTextField}
						onChange={this.onNameTextFieldChange}/>
					<Button onClick={this.onButtonClick}>
						Get Heart Rate Data
					</Button>
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