
import React,{useEffect, useRef, useState} from 'react';
import styled from 'styled-components';

// TODO: if styled components is not supported change this to normal css file
const TimerContainer = styled.div`
  .scrollbar-invisible {
    scrollbar-width: none;
  }

  &.center-bar::before {
    content: '';
    position: absolute;
    top: 50%;
    width: calc(100% - 16px);
    left: 8px;
    height: 3rem;
    transform: translateY(-50%);
    border-width: 1px 0 1px 0;
    border-color: slate-400;
    z-index: 0;
    
  }
  .scroll-centered-wrapper{
    scroll-snap-type: y mandatory;
  }

  .scroll-centered-item{
    scroll-snap-align: center;
  }

 .active{
    color: black;
  }
`;

const TimePicker = ({setTimerIndex = () => {},timeIndex = {hour:1,minute:1,second:1,meridian:1}}) => {
    // const
    const TIMER_HOURS = 'hour';
    const TIMER_MINUTES = 'minute';
    const TIMER_SECONDS = 'second';
    const TIMER_MERIDIAN = 'meridian';

    // state
    const [getTime, setTime] = useState(null)

    // ref
    const containerRefHours__scroll = useRef(null);
    const containerRefMinutes__scroll = useRef(null);
    const containerRefSeconds__scroll = useRef(null);
    const containerRefAmPm__scroll = useRef(null);

    const TimerConfig = [
        {
            ref: containerRefHours__scroll,
            itrationItem: HOURS,
            iterateItemKey: TIMER_HOURS
        },
        {
            ref: containerRefMinutes__scroll,
            itrationItem: MINUTES,
                iterateItemKey: TIMER_MINUTES
        },
        {
            ref: containerRefSeconds__scroll,
            itrationItem: SECONDS,
            iterateItemKey: TIMER_SECONDS
        },
        {
            ref: containerRefAmPm__scroll,
            itrationItem: MERIDIAN,
            iterateItemKey: TIMER_MERIDIAN
        }
    ]

    useEffect(()=>{
        // init CB fun
        const scrollHour = (e)=>onTimerScroll(e,TIMER_HOURS)
        const scrollMinute = (e)=>onTimerScroll(e,TIMER_MINUTES)
        const scrollSeconds = (e)=>onTimerScroll(e,TIMER_SECONDS)
        const scrollMeridian = (e)=>onTimerScroll(e,TIMER_MERIDIAN)

        containerRefHours__scroll.current?.addEventListener('scrollend',scrollHour)
        containerRefMinutes__scroll.current?.addEventListener('scrollend',scrollMinute)
        containerRefSeconds__scroll.current?.addEventListener('scrollend',scrollSeconds)
        containerRefAmPm__scroll.current?.addEventListener('scrollend',scrollMeridian)

        // auto scroll to selected time
        handleAutoScrollToItem();
        
        return()=> {
            containerRefHours__scroll.current?.removeEventListener('scrollend',scrollHour);
            containerRefMinutes__scroll.current?.removeEventListener('scrollend',scrollMinute)
            containerRefSeconds__scroll.current?.removeEventListener('scrollend',scrollSeconds)
            containerRefAmPm__scroll.current?.removeEventListener('scrollend',scrollMeridian)
        }
    },[])

    useEffect(()=> {
        setTimerIndex({...timeIndex,...getTime})
    },[getTime])


    const onTimerScroll = (e,timer)=>{
        const el = e.target;
        const scrollTop = el.scrollTop;
        const childHeight = el.querySelector('.item').clientHeight;
        const activeItemIndex = Math.floor(scrollTop / childHeight) + 1;
        const activeItem = el.querySelector(`.item:nth-child(${activeItemIndex})`);
        if(activeItem){
            setTime({[timer]:activeItemIndex})
        }
    }

    const onSelectScroll = (currentIndex,container) => {
        const activeItem = container.querySelector('.active');

        if(activeItem){
            const scrollItemHeight = activeItem.clientHeight;
            const activeItemIndex = activeItem.getAttribute('index');

            if(activeItemIndex < currentIndex){
                container.scrollTo({
                    top: container.scrollTop + scrollItemHeight,
                    behavior: 'smooth',
                    })
            }else if(activeItemIndex > currentIndex){
                container.scrollTo({
                    top: container.scrollTop - scrollItemHeight,
                    behavior: 'smooth',
                    })
            }
        }
    }

    const handleAutoScrollToItem = () => {
        if(timeIndex && TimerConfig){
            TimerConfig.forEach((item)=>{
                const itemHeight = item.ref.current.querySelector('.active')?.clientHeight;
                // hour scroll
                if(timeIndex.hour && item.iterateItemKey === TIMER_HOURS){
                    if (item.ref.current) {
                        item.ref.current.scrollTo({
                            top: (timeIndex.hour - 1) * itemHeight
                        });
                    }
                }

                // minute scroll
                if(timeIndex.minute && item.iterateItemKey === TIMER_MINUTES){
                    if (item.ref.current) {
                        item.ref.current.scrollTo({
                            top: (timeIndex.minute - 1) * itemHeight
                        });
                    }
                }
                
                // seconds scroll
                if(timeIndex.second && item.iterateItemKey === TIMER_SECONDS){
                    if (item.ref.current) {
                        item.ref.current.scrollTo({
                            top: (timeIndex.second - 1) * itemHeight
                        });
                    }
                }
                
                // meridian scroll
                if(timeIndex.meridian && item.iterateItemKey === TIMER_MERIDIAN){
                    if (item.ref.current) {
                        item.ref.current.scrollTo({
                            top: (timeIndex.meridian - 1) * itemHeight
                        });
                    }
                }
            })
        }
    };

    return(
        <TimerContainer className="relative w-full bg-white rounded-md shadow-lg min-h-[120px] flex content-between gap-5 center-bar">
            {TimerConfig.map((item,i)=>(<TimerList onSelectScroll={onSelectScroll} timeIndex={timeIndex} {...item} key={i}/>))}
        </TimerContainer>
    )
}

export default TimePicker;

const TimerList = React.forwardRef((props, ref) => {
    const {itrationItem,onSelectScroll,timeIndex,iterateItemKey} = props;
    return(
        <ul  ref={ref} className="flex flex-col flex-1 items-center h-[9rem] overflow-scroll scrollbar-invisible z-10 scroll-centered-wrapper">
            {
                ['',...itrationItem,''].map((hr,i)=> {
                    return (
                        <TimeItem value={hr} ref={ref} key={i} index={i} iterateItemKey={iterateItemKey} onSelectScroll={onSelectScroll} selectedTimerIndex={timeIndex} item={iterateItemKey}/>
                    )
                })
            }
        </ul>
    )
})

const TimeItem = React.forwardRef(({value,index, item,onSelectScroll,selectedTimerIndex}, ref) => {
    return(
        <li onClick={()=>onSelectScroll(index,ref.current)} index={index} className={`item flex min-h-[3rem] align-middle items-center text-slate-400 scroll-centered-item cursor-pointer select-none ${selectedTimerIndex?.[item] === index?'active':''}`} value={value}>{value}</li>
    )
})

// Hours
export const HOURS = ["12","01","02","03","04","05","06","07","08","09","10","11"];

// Minutes (0 to 59)
export const MINUTES = [
    "00",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
    "32",
    "33",
    "34",
    "35",
    "36",
    "37",
    "38",
    "39",
    "40",
    "41",
    "42",
    "43",
    "44",
    "45",
    "46",
    "47",
    "48",
    "49",
    "50",
    "51",
    "52",
    "53",
    "54",
    "55",
    "56",
    "57",
    "58",
    "59"
]
// Meridian
export const MERIDIAN = ['AM','PM']

// seconds
export const SECONDS = MINUTES;