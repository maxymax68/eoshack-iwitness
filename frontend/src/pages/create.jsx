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

			page: "profile",  // profile/select
			user: props.user

		};
		//this.handleFormEvent = this.handleFormEvent.bind(this);
	}

	render() {

		return (
			<div>
				<Typography>Issue a New Certificate</Typography>
				<form>
					<TextField
						name="id"
						label="ID"/>
					<TextField
						name="name"
						label="Certificate Name"/>
					<TextField
						name="description"
						label="Certificate Description"/>
					<Button>Submit</Button>
				</form>
			</div>
		)
		
	}

}


export default withStyles(styles)(Create);