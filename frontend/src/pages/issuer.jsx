import React, { Component } from 'react';
import Eos from 'eosjs'; // https://github.com/EOSIO/eosjs
import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
// import TextField from '@material-ui/core/TextField';
// import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';

import List from './list';
import Create from './create';
import Process from './process';


const styles = theme => ({
	banner: {
		background: "purple"
	},
	title: {
		color: "white"
	}
});


class Issuer extends Component {

	constructor(props) {
		super(props)
		this.state = {

			page: "list",  // list/create/process
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
		if (this.state.page === "list") {
			content = <List />
		} else if (this.state.page === "create") {
			content = <Create user={this.state.user} />
		} else if (this.state.page === "process") {
			content = <Process />
		}

		return (
			<div>
				<AppBar position="static" className={classes.banner}>
					<Toolbar>
						<Typography
							variant="title"
							className={classes.title}>
							iWITNESS | Issuer Portal
						</Typography>
					</Toolbar>
				</AppBar>
				<div
					style={{
						position: "fixed",
						right: "5px",
						top: "5px"
					}}>
					<Tooltip title="View Current Certifications">
						<Button
							name="list"
							variant="fab"
							color="primary"
							className={classes.pageButton}
							onClick={this.setPage.bind(this, "list")}>
							<Icon>find_in_page</Icon>
						</Button>
					</Tooltip>
					<Tooltip title="Issue New Certification">
						<Button
							name="create"
							variant="fab"
							color="primary"
							className={classes.pageButton}
							onClick={this.setPage.bind(this, "create")}>
							<Icon>find_in_page</Icon>
						</Button>
					</Tooltip>
					<Tooltip title="Process Applications">
						<Button
							name="process"
							variant="fab"
							color="primary"
							className={classes.pageButton}
							onClick={this.setPage.bind(this, "process")}>
							<Icon>find_in_page</Icon>
						</Button>
					</Tooltip>
				</div>
				{content}
			</div>
		)

	}

}


export default withStyles(styles)(Issuer);