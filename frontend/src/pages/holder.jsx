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

import Select from './select';
import Profile from './profile';


const styles = theme => ({
	banner: {
		background: "green"
	},
	title: {
		color: "white"
	}
});


class Holder extends Component {

	constructor(props) {
		super(props)
		this.state = {

			page: "profile",  // profile/select
			user: props.user

		};
		//this.handleFormEvent = this.handleFormEvent.bind(this);
		this.setPage = this.setPage.bind(this);
	}

	setPage(page) {
		this.setState({
			page: page,
			user: this.state.user
		})
	}

	render() {

		const { classes } = this.props;

		let content;
		if (this.state.page === "profile") {
			content = <Profile />
		} else if (this.state.page === "select") {
			content = <Select />
		}

		return (
			<div>
				<AppBar position="static" className={classes.banner}>
					<Toolbar>
						<Typography
							variant="title"
							className={classes.title}>
							iWITNESS | Holder Portal
						</Typography>
					</Toolbar>
				</AppBar>
				<div
					style={{
						position: "fixed",
						right: "5px",
						top: "5px"
					}}>
					<Tooltip title="View Your Credentials">
						<Button
							name="profile"
							variant="fab"
							color="primary"
							className={classes.pageButton}
							onClick={this.setPage.bind(this, "profile")}>
							<Icon>find_in_page</Icon>
						</Button>
					</Tooltip>
					<Tooltip title="Apply for New Credentials">
						<Button
							name="select"
							variant="fab"
							color="primary"
							className={classes.pageButton}
							onClick={this.setPage.bind(this, "select")}>
							<Icon>find_in_page</Icon>
						</Button>
					</Tooltip>
				</div>
				{content}
			</div>
		)

	}

}


export default withStyles(styles)(Holder);