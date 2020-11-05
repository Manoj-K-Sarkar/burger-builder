import React, { Component } from 'react';
import { connect } from 'react-redux';

import Auxilary from '../Auxilary/Auxilary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerCloseHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    drawerToggleHandler = () => {
        const newShowSideDrawer = !this.state.showSideDrawer;
        this.setState({ showSideDrawer: newShowSideDrawer });
    }

    render() {
        return (
            <Auxilary>
                <Toolbar
                    isAuth={this.props.isAuthenticated}
                    toggle={this.drawerToggleHandler} />
                <SideDrawer
                    isAuth={this.props.isAuthenticated}
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerCloseHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxilary>
        );
    }
};

const mapStateProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateProps)(Layout);