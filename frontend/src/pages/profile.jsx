import React, { Component } from 'react';
import Eos from 'eosjs'; // https://github.com/EOSIO/eosjs
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
	
});


class Profile extends Component {

	render() {

		return (
			<div>
				<div>Profile Page</div>
				<div>List of Owned Credentials</div>
			</div>
		)
		
	}

}


export default withStyles(styles)(Profile);