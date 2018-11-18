import React, {Component} from 'react';

import {withStyles} from '@material-ui/core/es/styles';
import {
  Grid, Paper, Table, TableHead, TableBody, TableRow, TableCell,
} from '@material-ui/core';

import {getTransactions} from '../../api/transactions';


const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 4,
  },
  date: {
    width: theme.spacing.unit * 16,
  }
});


class Dashboard extends Component {
  state = {
    orderBy: 'amount_cop',
    transactions: [],
  };

  componentDidMount() {
    getTransactions()
      .then(response => {
        this.setState(state => ({
          ...state,
          transactions: response.data,
        }))
      })
  }

  render() {
    const {classes} = this.props;

    const {orderBy, transactions} = this.state;

    return (
      <Grid container className={classes.root} justify="center">
        <Grid item xs={10}>
          <Paper className={classes.paper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.date}>Дата</TableCell>
                  <TableCell numeric>Сума</TableCell>
                  <TableCell>Одержувач</TableCell>
                  <TableCell>Код одержувача</TableCell>
                  <TableCell>Призначення платежу</TableCell>
                  <TableCell>Категорія</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.sort((a, b) => b[orderBy] - a[orderBy]).map(transaction => {
                  return (
                    <TableRow key={transaction.id}>
                      <TableCell component="th" scope="row">{transaction.trans_date}</TableCell>
                      <TableCell numeric>{transaction.amount}</TableCell>
                      <TableCell>{transaction.recipt_name}</TableCell>
                      <TableCell>{transaction.recipt_edrpou}</TableCell>
                      <TableCell>{transaction.payment_details}</TableCell>
                      <TableCell>{transaction.category}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Dashboard);
