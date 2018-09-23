import React, { Component } from 'react';
import Eos from 'eosjs'; // https://github.com/EOSIO/eosjs
import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
	
});


class Create extends Component {

	constructor(props) {
		super(props)
		this.state = {

			phase: "empty",
			user: props.user

		};
		this.submitCertificate = this.submitCertificate.bind(this);
	}

	async submitCertificate(event) {

		// stop default behaviour
		event.preventDefault();

		// collect form data
		let id = event.target.id.value;
		let name = event.target.name.value;
		let description = event.target.description.value;

		// prepare variables for the switch below to send transactions
		let actionName = "";
		let actionData = {};

		// define actionName and action according to event type
		switch (event.type) {
		  case "submit":
		  	this.setState({
		  		user: this.state.user,
		  		phase: "pending"
		  	})
		    actionName = "issuecert";
		    actionData = {
		      _user: this.state.user.name,
		      _id: id,
		      _name: name,
		      _description: description,
		      _tags: ""
		    };
		    break;
		  default:
		    return;
		}

		// eosjs function call: connect to the blockchain
		console.log(this.state.user.privateKey);
		const eos = Eos({keyProvider: this.state.user.privateKey});
		const result = await eos.transaction({
		  actions: [{
		    account: "iwitnessacc",
		    name: actionName,
		    authorization: [{
		      actor: this.state.user.name,
		      permission: 'active',
		    }],
		    data: actionData,
		  }],
		});

		if (result) {
			this.setState({
				phase: "success",
				user: this.state.user
			})
		} else {
			this.setState({
				phase: "failed",
				user: this.state.user
			})
		}
		console.log(result);

	}

	render() {

		const { classes } = this.props;

		return (
			<div>
				<Typography>Issue a New Certificate</Typography>
				{this.state.phase}
				<form onSubmit={this.submitCertificate}>
					<TextField
						name="id"
						label="ID"/>
					<TextField
						name="name"
						label="Certificate Name"/>
					<TextField
						name="description"
						label="Certificate Description"/>
					<Button
		              variant="contained"
		              color="primary"
		              className={classes.formButton}
		              type="submit">
		              Create Certificate
		            </Button>
				</form>
			</div>
		)
		
	}

}


export default withStyles(styles)(Create);