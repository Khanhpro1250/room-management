import moment from 'moment';

export const ComboFilterReportDto = [
    { value: moment().format('YYYY-MM'), label: 'Tháng hiện tại' },
    { value: moment().add(-1, 'month').format('YYYY-MM'), label: 'Tháng trước' },
    { value: moment().add(-2, 'months').format('YYYY-MM'), label: '2 tháng gần đây' },
    { value: moment().add(-3, 'months').format('YYYY-MM'), label: '3 tháng qua' },
    { value: moment().add(-4, 'months').format('YYYY-MM'), label: '4 tháng qua' },
    { value: moment().add(-6, 'months').format('YYYY-MM'), label: '6 tháng qua' },
    { value: moment().add(-1, 'year').format('YYYY-MM'), label: '1 năm qua' },
    { value: moment().add(-2, 'year').format('YYYY-MM'), label: '2 năm qua' },
    { value: moment().add(-3, 'year').format('YYYY-MM'), label: '3 năm qua' },
];
