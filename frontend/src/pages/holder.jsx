import React, { Component } from 'react';
import Eos from 'eosjs'; // https://github.com/EOSIO/eosjs
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
	
});


class Holder extends Component {

	render() {

		return (
			<div>
				<div>PROFILE</div>
				<div>List of certificates held by this user</div>
			</div>
		)

	}

}


export default withStyles(styles)(Holder);