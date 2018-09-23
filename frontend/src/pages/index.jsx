import React, { Component } from 'react';
import Eos from 'eosjs'; // https://github.com/EOSIO/eosjs

// material-ui dependencies
import { withStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
// import TextField from '@material-ui/core/TextField';
// import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
// import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';

import Issuer from './issuer';
import Holder from './holder';
import Inspector from './inspector';

// NEVER store private keys in any source code in your real life development
// This is for demo purposes only!
const accounts = [
	{"name":"demoissuer", "privateKey":"5K7mtrinTFrVTduSxizUc5hjXJEtTjVTsqSHeBHes1Viep86FP5", "publicKey":"EOS6kYgMTCh1iqpq9XGNQbEi8Q6k5GujefN9DSs55dcjVyFAq7B6b"},
	{"name":"demoholder", "privateKey":"5KLqT1UFxVnKRWkjvhFur4sECrPhciuUqsYRihc1p9rxhXQMZBg", "publicKey":"EOS78RuuHNgtmDv9jwAzhxZ9LmC6F295snyQ9eUDQ5YtVHJ1udE6p"},
	{"name":"demoinspectr", "privateKey":"5K2jun7wohStgiCDSDYjk3eteRH1KaxUQsZTEmTGPH4GS9vVFb7", "publicKey":"EOS5yd9aufDv7MqMquGcQdD6Bfmv6umqSuh9ru3kheDBqbi6vtJ58"},
];

// set up styling classes using material-ui "withStyles"
const styles = theme => ({
	card: {
		margin: 20,
	},
	paper: {
		...theme.mixins.gutters(),
		paddingTop: theme.spacing.unit * 2,
		paddingBottom: theme.spacing.unit * 2,
	},
	formButton: {
		marginTop: theme.spacing.unit,
		width: "100%",
	},
	modePanel: {
		position: "fixed",
		float: "right",
		width: "20%"
	},
	modeButton: {
		flex: 1,
		marginLeft: 10,
		color: "goldenrod"
	},
	icon: {
		color: "white"
	},
	keyText: {
		display: "inline-block",
		float: "right",
		marginRight: "10px",
		paddingTop: "8px",
		color: "lightgrey"
	},
	pre: {
		background: "#ccc",
		padding: 10,
		marginBottom: 0.
	},
});



// Index component
class Index extends Component {

	constructor(props) {
		super(props)
		this.state = {

			mode: "holder",  // issuer/holder/inspector
			user: accounts[0]

		};
		//this.handleFormEvent = this.handleFormEvent.bind(this);
		this.setMode = this.setMode.bind(this);
	}



	// generic function to handle form events (e.g. "submit" / "reset")
	// push transactions to the blockchain by using eosjs
	// async handleFormEvent(event) {

	// 	// stop default behaviour
	// 	event.preventDefault();

	// 	// collect form data
	// 	let account = event.target.account.value;
	// 	let privateKey = event.target.privateKey.value;
	// 	let note = event.target.note.value;

	// 	// prepare variables for the switch below to send transactions
	// 	let actionName = "";
	// 	let actionData = {};

	// 	// define actionName and action according to event type
	// 	switch (event.type) {
	// 		case "submit":
	// 			actionName = "update";
	// 			actionData = {
	// 				_user: account,
	// 				_note: note,
	// 			};
	// 			break;
	// 		default:
	// 			return;
	// 	}

	// 	// eosjs function call: connect to the blockchain
	// 	const eos = Eos({keyProvider: privateKey});
	// 	const result = await eos.transaction({
	// 		actions: [{
	// 			account: "notechainacc",
	// 			name: actionName,
	// 			authorization: [{
	// 				actor: account,
	// 				permission: 'active',
	// 			}],
	// 			data: actionData,
	// 		}],
	// 	});

	// 	console.log(result);
	// 	this.getTable();
	// }

	// gets table data from the blockchain
	// and saves it into the component state: "noteTable"
	// getTable() {
	// 	const eos = Eos();
	// 	eos.getTableRows({
	// 		"json": true,
	// 		"code": "notechainacc",   // contract who owns the table
	// 		"scope": "notechainacc",  // scope of the table
	// 		"table": "notestruct",    // name of the table as specified by the contract abi
	// 		"limit": 100,
	// 	}).then(result => this.setState({ noteTable: result.rows }));
	// }

	setMode(mode) {

		// Hack to switch user automatically between modes
		let u;
		if (mode === "issuer") {
			u = 0
		} else if (mode === "holder") {
			u = 1
		} else if (mode === "inspector") {
			u = 2
		}

		this.setState({
			mode: mode,
			user: accounts[u]
		});
	}

	// componentDidMount() {
	// 	this.getTable();
	// }

	render() {
		//const { noteTable } = this.state;
		const { classes } = this.props;

		// generate each note as a card
		// const generateCard = (key, timestamp, user, note) => (
		// 	<Card className={classes.card} key={key}>
		// 		<CardContent>
		// 			<Typography variant="headline" component="h2">
		// 				{user}
		// 			</Typography>
		// 			<Typography style={{fontSize:12}} color="textSecondary" gutterBottom>
		// 				{new Date(timestamp*1000).toString()}
		// 			</Typography>
		// 			<Typography component="pre">
		// 				{note}
		// 			</Typography>
		// 		</CardContent>
		// 	</Card>
		// );
		// let noteCards = noteTable.map((row, i) =>
		// 	generateCard(i, row.timestamp, row.user, row.note));

		const mode = this.state.mode;
		let content;
		if (mode === "issuer") {
			content = <Issuer user={this.state.user}/>
		} else if (mode === "holder") {
			content = <Holder />
		} else if (mode === "inspector") {
			content = <Inspector />
		}

		return (
			<div>
				{ content }
				<div style={{
						position: "fixed",
						height: "6%",
						right: "0px",
						left: "0px",
						bottom: "0px",
						paddingBottom: "5px",
						background: "grey"
					}}>
					<Tooltip title="Holder Portal">
						<Button
							name="holder"
							style={{color: "darkgreen"}}
							className={classes.modeButton}
							onClick={this.setMode.bind(this, "holder")}>
							Holder
						</Button>
					</Tooltip>
					<Tooltip title="Issuer Portal">
						<Button
							name="issuer"
							style={{color: "purple"}}
							className={classes.modeButton}
							onClick={this.setMode.bind(this, "issuer")}>
							Issuer
						</Button>
					</Tooltip>
					<Tooltip title="Inspector Portal">
						<Button
							name="inspector"
							style={{color: "goldenrod"}}
							className={classes.modeButton}
							onClick={this.setMode.bind(this, "inspector")}>
							Inspector
						</Button>
					</Tooltip>
					<Typography className={classes.keyText}>
						<strong>USER:</strong> { this.state.user["name"] } ({ this.state.user["publicKey"] })
					</Typography>
				</div>
			</div>
		);
				
	}

}

export default withStyles(styles)(Index);
