import { getMonthsArr } from '../helpers/getMonthsArr';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import s from './MonthSwitcher.module.css';
import {  today } from '../helpers/getDate';

const MonthSwitcher = ({ selectedMonth, setSelectedMonth, registrationDate}) => {


  const handlePrevMonth = () => {
    selectedMonth.month === 0
      ? setSelectedMonth(prev => ({ ...prev, month: 11, year: prev.year - 1 }))
      : setSelectedMonth(prev => ({ ...prev, month: prev.month - 1 }));
  };

  const handleNextMonth = () => {
    selectedMonth.month === 11
      ? setSelectedMonth(prev => ({ ...prev, month: 0, year: prev.year + 1 }))
      : setSelectedMonth(prev => ({ ...prev, month: prev.month + 1 }));
  };

  const isButtonPrevDisabled = () => {
    return registrationDate.month === selectedMonth.month &&
      registrationDate.year === selectedMonth.year
      ? true
      : false;
  };

  const isButtonNextDisabled = () => {
    return (
      selectedMonth.year >= today.year + 5 &&
      selectedMonth.month === today.month
    );
  };

  return (
    <div className={s.wrap}>
      <h2 className={s.h2}>Month</h2>
      <div className={s.div}>
        <button className={s.button} onClick={handlePrevMonth} disabled={isButtonPrevDisabled()}>
          <SlArrowLeft fill='#407bff' />
        </button>
        <p className={s.p}>
          {getMonthsArr(selectedMonth.year)[selectedMonth.month].name},{' '}
          {selectedMonth.year}
        </p>
        <button className={s.button} onClick={handleNextMonth} disabled={isButtonNextDisabled()}>
          <SlArrowRight fill='#407bff' />
        </button>
      </div>
    </div>
  );
};

export default MonthSwitcher;
