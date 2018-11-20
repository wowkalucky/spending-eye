import React, {Component} from 'react';

import {withStyles} from '@material-ui/core/es/styles';
import {
  Grid, Paper, Table, TableHead, TableBody, TableRow, TableCell,
} from '@material-ui/core';

import {getTransactions} from '../../api/transactions';
import PeriodButton from '../PeriodButton/PeriodButton';


const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 4,
  },
  date: {
    width: theme.spacing.unit * 16,
  },
});

const periods = {
  M0: 'current month',
  Q0: 'current quarter',
  Y0: 'current year',
  M1: 'first month',
  Q1: 'first quarter',
  Y2017: '2017 year',
};


class Dashboard extends Component {
  state = {
    // orderBy: 'amount_cop',
    orderBy: 'trans_date',
    period: 'M0',
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

  sort = (a, b) => {
    const {orderBy} = this.state;

    if (a[orderBy] > b[orderBy]) {
      return 1;
    }
    if (b[orderBy] > a[orderBy]) {
      return -1;
    }
    return 0;
  };

  handleFilter = (period) => {
    console.log(period);
  };

  render() {
    const {classes} = this.props;
    const {transactions} = this.state;

    return (
      <Grid container className={classes.root} justify="center">
        <Grid item xs={10}>
          <PeriodButton title='Поточний місяць' onClick={() => this.handleFilter('M0')}/>
          <PeriodButton title='Поточний квартал'  onClick={() => this.handleFilter('Q0')} />
          <PeriodButton title='Поточний рік' onClick={() => this.handleFilter('Y0')}/>
        </Grid>
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
                {transactions.sort(this.sort).map(transaction => {
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
