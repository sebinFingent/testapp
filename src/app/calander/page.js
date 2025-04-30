'use client'
import React,{ useRef, useState} from 'react';
import Calendar from 'react-calendar';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
import TimePicker,{ HOURS, MINUTES} from '@/components/timepicker/TimePicker';
import useOutsideClick from '@/lib/hooks/useOutsideClick';

const ControlContainer = styled.div`
  .react-calendar{
    border-radius: 6px;
    border: none;
  }
  .react-calendar__month-view__weekdays {
    text-transform: capitalize;
    abbr {
        text-decoration: none;
    }
  }
  .react-calendar__month-view__weekdays__weekday--weekend{
    color: red;
  }
  .react-calendar__month-view__days__day--weekend {
    color: black;
  }
  .react-calendar__tile--active{
    color: #006edc;
    background: none !important;
  }
`;

const CustomCalander = () => {
    
    // toggle visibility of calandar
    const [showCalendar, handleCalendarVisibility] = useState(false);

    // toggle visiblity of timer
    const [showTimer, handletimerVisibility] = useState(false);

    const [timeIndex, setTimerIndex] = useState({hour:1,minute:1,second:1,meridian:1})

    const [calandarValue, setCalander] = useState(new Date());

    const containerRef = useRef(null);

    useOutsideClick(containerRef,()=>{
        handletimerVisibility(false);
        handleCalendarVisibility(false);
    })

    const toggleTimer = ()=> {
        handletimerVisibility(!showTimer);
        handleCalendarVisibility(false);
    }

    const toggleCalendar = ()=> {
        handleCalendarVisibility(!showCalendar);
        handletimerVisibility(false);
    }

    const formatWeekday = (locale, date) => {
        const shortWeekdays =  date.toLocaleDateString(locale, { weekday: 'short' }); 
        return shortWeekdays;
    };

    const formatDate = (date) => {
        const options = { weekday: 'short', day: '2-digit', month: '2-digit' };
        return new Intl.DateTimeFormat('en-GB', options).format(date);
    };
 
    return (
        <div className="bg-[#3fc7f2] w-full h-full p-2">
            <section ref={containerRef} className="w-64">
                {/* control-selection */}
                <div className="bg-white min-h-10 rounded-lg w-64 p-5">
                    <section className="flex content-center gap-5">
                        
                        {/* date section */}
                        <div className="flex gap-2 items-center" onClick={toggleCalendar}>
                            <i  className="fas fa-calendar-alt icon accent-pink-500" ></i>
                            <label> {formatDate(calandarValue)}</label>
                        </div>

                        {/* seprator */}
                        <span className="bg-[#bdbdbd] w-0.5 h-6"/>

                        {/* time section */}
                        <div className="flex gap-2 items-center" onClick={toggleTimer}>
                            <i className="fas fa-sharp fa-light fa-clock" ></i>
                            <label> {`${('0' + (HOURS[timeIndex?.hour - 1] ?? 0)).slice(-2)}:${('0' + (MINUTES[timeIndex?.minute - 1] ?? 0)).slice(-2)}`} </label>
                        </div>
                    </section>
                </div>

                {/* calander and timer control*/}
                <ControlContainer  style={{display:showCalendar || showTimer?"block":"none"}} className="w-64">
                    {showCalendar && 
                        <Calendar
                            next2Label={null} 
                            prev2Label={null} 
                            calendarType={'gregory'} 
                            showNeighboringMonth={false}
                            // formatShortWeekday={formatWeekday}
                            onChange={setCalander} 
                            value={calandarValue}
                        />
                    }
                    {showTimer && 
                    <TimePicker setTimerIndex={setTimerIndex} timeIndex={timeIndex}/>
                    }
                </ControlContainer>

            </section>
            
        </div>
    )
}

export default CustomCalander;

