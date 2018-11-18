import axios from 'axios';
import moment from 'moment';

import {endpoints, baseURL, payers_edrpous, dateFormat} from './index';

const api = axios.create({baseURL, url: endpoints.transactions, method: 'get'});

export const getTransactions = (startDate, endDate) => (
  api({params: {
    payers_edrpous: payers_edrpous,
    startdate: startDate || moment().startOf('month').format(dateFormat),
    enddate: endDate || moment().format(dateFormat),
  }})
);