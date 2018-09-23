import React, { Component } from 'react';
import Eos from 'eosjs'; // https://github.com/EOSIO/eosjs
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
	
});


class Apply extends Component {



	// push transactions to the blockchain by using eosjs
	async handleFormEvent(event) {
		
		// stop default behaviour
		event.preventDefault();

		// collect form data
		let account = event.target.account.value;
		let privateKey = event.target.privateKey.value;
		let note = event.target.note.value;

		// prepare variables for the switch below to send transactions
		let actionName = "";
		let actionData = {};

		// define actionName and action according to event type
		switch (event.type) {
			case "submit":
				actionName = "update";
				actionData = {
					_user: account,
					_note: note,
				};
				break;
			default:
				return;
		}

		// eosjs function call: connect to the blockchain
		const eos = Eos({keyProvider: privateKey});
		const result = await eos.transaction({
			actions: [{
				account: "notechainacc",
				name: actionName,
				authorization: [{
					actor: account,
					permission: 'active',
				}],
				data: actionData,
			}],
		});

		console.log(result);
		this.getTable();
	}


	render() {

		return (
			<div>
				<div>Apply for Accreditation</div>
				<div>List of Credentials</div>
			</div>
		)
		
	}

}


export default withStyles(styles)(Apply);