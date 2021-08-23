import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Paper } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { Link, Route, BrowserRouter, Switch } from "react-router-dom";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import ContactView from './ContactView'
import Address from "./Address";

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500
  }
});

interface FullWidthTabsProps { // Added this interface for props
 classes: {root: string},
  theme: any,
}
class FullWidthTabs extends React.Component<FullWidthTabsProps > {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme }  = this.props;

    return (
      <BrowserRouter>
        <div className={classes.root}>
          <AppBar position="static" color="default">
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
              fullWidth
            >
              <Tab label="General" component={Link} to="/one" />
              <Tab label="Addresses" component={Link} to="/two" />
            </Tabs>
          </AppBar>

          <Switch>
            <Route path="/one" component={PageShell(ContactView)} />
            <Route path="/two" component={PageShell(Address)} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

FullWidthTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

function ItemOne(theme) {
  return (
    <Paper>
      <div>Item 1</div>
    </Paper>
  );
}

function ItemTwo(theme) {
  return (
    <Paper>
      <div>Item two</div>
    </Paper>
  );
}

const PageShell = (Page, previous) => {
  return props => (
    <div className="page">
      <ReactCSSTransitionGroup
        transitionAppear={true}
        transitionAppearTimeout={600}
        transitionEnterTimeout={600}
        transitionLeaveTimeout={600}
        transitionName={props.match.path === "/one" ? "SlideIn" : "SlideOut"}
      >
        {console.log(props)}
        <Page {...props} />
      </ReactCSSTransitionGroup>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(FullWidthTabs);
