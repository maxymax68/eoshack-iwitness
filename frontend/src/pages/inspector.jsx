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
	banner: {
		background: "goldenrod"
	},
	heading: {

	},
	pageButton: {

	},
});


class Inspector extends Component {

	constructor(props) {
		super(props)
		this.state = {

			certificateList: [],
			page: props.page | "inspect"

		};
		//this.handleFormEvent = this.handleFormEvent.bind(this);
		this.setPage = this.setPage.bind(this);
	}

	getCertificates() {
		const eos = Eos();
		eos.getTableRows({
			"json": true,
			"code": "iwitnessacc",   // contract who owns the table
			"scope": "iwitnessacc",  // scope of the table
			"table": "certtable",    // name of the table as specified by the contract abi
			"limit": 100,
		}).then(result => this.setState({
			certificateList: result.rows,
			page: this.state.page
		}));
	}

	setPage(page) {
		this.setState({
			certificateList: this.state.certificateList,
			page: this.state.page
		});
	}

	componentDidMount() {
		this.getCertificates();
	}

	render() {

		const { classes } = this.props;

		const generateCertCard = (key, timestamp, id, name, desc, tags, issuer) => (
			<Card className={classes.card} key={key}>
				<CardContent>
					<Typography variant="headline">{name}</Typography>
					<Typography variant="subtitle">{id}</Typography>
					<Typography component="pre">{desc}</Typography>
					<Typography className={classes.certtags}>{tags}</Typography>
					<Typography className={classes.issuerKey}>{issuer}</Typography>
					<form>
						<TextField className={classes.holderKey}></TextField>
						<Button>Check Credentials</Button>
					</form>
				</CardContent>
			</Card>
		);
		let certCards = this.state.certificateList.map((row, i) =>
			generateCertCard(i, row.timestamp, row.id, row.name,
				         row.description, row.issuer));

		return (
			<div>
				<AppBar position="static" className={classes.banner}>
					<Toolbar>
						<Typography
							variant="title"
							className={classes.title}>
							iWITNESS | Inspector Portal
						</Typography>
					</Toolbar>
				</AppBar>
				<div
					style={{
						position: "fixed",
						right: "5px",
						top: "5px"
					}}>
					<Tooltip title="Verify Credentials">
						<Button
							name="inspect"
							variant="fab"
							color="primary"
							className={classes.pageButton}
							onClick={this.setPage.bind(this, "inspect")}>
							<Icon>find_in_page</Icon>
						</Button>
					</Tooltip>
				</div>
				<Typography className={classes.heading}>
					Verify Credentials
				</Typography>
				<form>
					<TextField placeholder="Search Available Credentials..."/>
					<Button>SEARCH</Button>
				</form>
				{certCards}
			</div>
		)
		
	}

}


export default withStyles(styles)(Inspector);