import React from 'react';
import PropTypes from 'prop-types';

import {withStyles} from '@material-ui/core/es/styles';
import {
  Button,
} from '@material-ui/core';

const styles = theme => ({
  button: {
    marginBottom: theme.spacing.unit * 4,
    marginRight: theme.spacing.unit,
  }
});

const PeriodButton = ({classes, title, active, onClick}) => (
  <Button
    variant="contained" size="large"
    color={active ? "primary" : "default"} className={classes.button}
    onClick={onClick}
  >
    {title}
  </Button>
);

PeriodButton.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

export default withStyles(styles)(PeriodButton);