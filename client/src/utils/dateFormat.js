import moment from 'moment'


export const dateForm = (date) => {
    return moment(date).format('DD/MM/YYYY');
}