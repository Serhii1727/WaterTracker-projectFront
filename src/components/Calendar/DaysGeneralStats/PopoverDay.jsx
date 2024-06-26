import { useEffect, useState, useMemo } from 'react';
import { getMonthsArr } from '../helpers/getMonthsArr';
import { Popover } from '@mui/material';
import d from './PopoverDayStyles.module.css';
import b from './PopoverButton.module.css';
import { useSelector } from 'react-redux';
import { selectTodayWater } from '../../../redux/waterData/waterSelectors';

const PopoverDay = ({ date, norm, selectedMonth }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [coordsButton, setCoordsButton] = useState({ left: 0, top: 0 });
  const [isMobile, setIsMobile] = useState(false);

  const { percentageWaterDrunk, dosesWater } = useSelector(selectTodayWater);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const handleResize = event => {
      setIsMobile(event.matches);
    };

    handleResize(mediaQuery);
    mediaQuery.addEventListener('change', handleResize);
    return () => {
      mediaQuery.removeEventListener('change', handleResize);
    };
  }, []);

  const handleClick = event => {
    const button = event.currentTarget;
    setAnchorEl(event.currentTarget);
    const anchorTop = button.getBoundingClientRect().top;
    setCoordsButton(prev => ({ ...prev, top: anchorTop }));
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const anchor = isMobile ? 'anchorPosition' : 'anchorEl';
  const halfWidthPopover = 280 / 2;
  const screenWidth = window.innerWidth / 2;
  const leftCoordinate = screenWidth + halfWidthPopover;

  const popoverContent = useMemo(() => (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorReference={anchor}
      anchorPosition={{ top: coordsButton.top, left: leftCoordinate }}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
    >
      <div className={d.div}>
        <div>
          <p className={d.date}>
            {date}, {getMonthsArr(selectedMonth.year)[selectedMonth.month].name}
          </p>
        </div>
        <p>
          Daily norma: <span className={d.span}>{norm}</span>
        </p>
        <p>
          Fulfillment of the daily norm: <span className={d.span}>{percentageWaterDrunk}%</span>
        </p>
        <p>
          How many servings of water: <span className={d.span}>{Array.isArray(dosesWater) ? dosesWater.length : 0}</span>
        </p>
      </div>
    </Popover>
  ), [id, open, anchorEl, handleClose, coordsButton.top, leftCoordinate, date, norm, selectedMonth, percentageWaterDrunk, dosesWater]);

  return (
    <>
      <>
        <button className={b.button}
          data-fulfilled={percentageWaterDrunk >= 100 ? 'true' : 'false'}
          disabled={!percentageWaterDrunk ? true : false}
          aria-describedby={id}
          onClick={handleClick}
        >
          {date}
        </button>
      </>

      {popoverContent}
    </>
  );
};

export default PopoverDay;
