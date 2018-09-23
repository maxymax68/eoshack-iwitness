import React, { Component } from 'react';
import Eos from 'eosjs'; // https://github.com/EOSIO/eosjs
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
	
});


class List extends Component {

	render() {

		return (
			<div>
				<div>Certificates</div>
				<div>List of Issued Certificates</div>
			</div>
		)
		
	}

}


export default withStyles(styles)(List);