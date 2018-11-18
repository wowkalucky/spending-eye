import React, {Component} from 'react';

import {withStyles} from '@material-ui/core/es/styles';
import {
  Grid, Paper, Table, TableHead, TableBody, TableRow, TableCell,
} from '@material-ui/core';


const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 4,
  }
});


class Dashboard extends Component {

  render() {
    const {classes} = this.props;

    let id = 0;

    function createData(trans_date, amount, recipt_name, recipt_edrpou, payment_details, category) {
      id += 1;
      return {id, trans_date, amount, recipt_name, recipt_edrpou, payment_details, category};
    }

    const rows = [
      createData('2018-11-18', 100.00, 'Контрагент1', '01234567', 'За матеріали', 'Благоустрій'),
      createData('2018-11-18', 200.00, 'Контрагент2', '01234567', 'За матеріали', 'Благоустрій'),
      createData('2018-11-18', 300.00, 'Контрагент3', '01234567', 'За матеріали', 'Благоустрій'),
      createData('2018-11-18', 400.00, 'Контрагент4', '01234567', 'За матеріали', 'Благоустрій'),
      createData('2018-11-18', 500.00, 'Контрагент5', '01234567', 'За матеріали', 'Благоустрій'),
    ];

    return (
      <Grid container className={classes.root} spacing={16} justify="center">
        <Grid item xs={10}>
          <Paper className={classes.paper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Дата</TableCell>
                  <TableCell numeric>Сума</TableCell>
                  <TableCell>Одержувач</TableCell>
                  <TableCell>Код одержувача</TableCell>
                  <TableCell>Призначення платежу</TableCell>
                  <TableCell>Категорія</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => {
                  return (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">{row.trans_date}</TableCell>
                      <TableCell numeric>{row.amount}</TableCell>
                      <TableCell>{row.recipt_name}</TableCell>
                      <TableCell>{row.recipt_edrpou}</TableCell>
                      <TableCell>{row.payment_details}</TableCell>
                      <TableCell>{row.category}</TableCell>
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
