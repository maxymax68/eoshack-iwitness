import React, { Component } from 'react';
import Eos from 'eosjs'; // https://github.com/EOSIO/eosjs
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
	
});


class Issuer extends Component {

	render() {

		return (
			<div>
				<div>Issue a New Form of Certification</div>
				<div>Form describing Certificate</div>
			</div>
		)

	}

}


export default withStyles(styles)(Issuer);