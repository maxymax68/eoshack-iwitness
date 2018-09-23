import React, { Component } from 'react';
import Eos from 'eosjs'; // https://github.com/EOSIO/eosjs
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
	
});


class Select extends Component {

	render() {

		return (
			<div>
				<div>New Application Select</div>
				<div>List of Available Credentials</div>
			</div>
		)
		
	}

}


export default withStyles(styles)(Select);