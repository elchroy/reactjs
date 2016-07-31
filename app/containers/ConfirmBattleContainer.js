import React from 'react';
import ConfirmBattle from "../components/ConfirmBattle";
import githubHelpers from '../utils/githubHelpers';

var ConfirmBattleContainer = React.createClass({
    contextTypes: {
		router: React.PropTypes.object.isRequired
	},

	getInitialState: function () {
	    return {
	    	isLoading: true,
	    	playersInfo: []
	    };
	},

	componentWillMount: function () {
		var {query} = this.props.location;
	},

    componentDidMount: function () {
		var {query} = this.props.location;
		githubHelpers.getPlayersInfo([query.playerOne, query.playerTwo])
		.then( function (players) {
			this.setState({
				isLoading: false,
				playersInfo: [players[0], players[1]]
			})
		}.bind(this));
	},

	handleInitiateBattle: function() {
		this.context.router.push({
			pathname: '/results',
			state: {
				playersInfo: this.state.playersInfo
			}
		});
	},

    render: function() {
        return (
        	<ConfirmBattle
        	isLoading={this.state.isLoading}
        	onInitiateBattle={this.handleInitiateBattle}
        	playersInfo={this.state.playersInfo}
        	/>
        );
    }
});

module.exports = ConfirmBattleContainer;
