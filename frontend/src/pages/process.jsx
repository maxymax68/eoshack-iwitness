import React, { Component } from 'react';
import Eos from 'eosjs'; // https://github.com/EOSIO/eosjs
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
	
});


class Process extends Component {

	render() {

		return (
			<div>
				<div>Processing Page</div>
				<div>List of Pending Validations</div>
			</div>
		)
		
	}

}


export default withStyles(styles)(Process);