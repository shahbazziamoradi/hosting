import React, { useState, useEffect } from 'react'
import { Button } from '../cuteUI';
import './persianCalendar.css'
import * as Icon from 'react-bootstrap-icons'
import * as Basic from '../elements/basics';

function FixNumbers(string: string) {
    var persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
        arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];
    for (var i = 0; i < 10; i++) {
        string = string.replace(persianNumbers[i], String(i)).replace(arabicNumbers[i], String(i));
    }
    return string;
};

function GetYear(date: string) {
    return Number(date.split('/')[0])
}

function GetMonth(date: string) {
    return Number(date.split('/')[1])
}

function GetDay(date: string) {
    return Number(date.split('/')[2])
}

function GetMonthName(month: number) {
    var names = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند']
    return names[(month == 0) ? 11 : (month - 1)];
}

function ToDateFormat(date: string) {
    var year = GetYear(date);
    var month = String(GetMonth(date));
    if (month.length == 1) {
        month = "0" + month;
    }
    var day = String(GetDay(date));
    if (day.length == 1) {
        day = "0" + day;
    }

    return year + "/" + month + "/" + day;
}

export function PersianCalendar({ date = FixNumbers(new Date().toLocaleDateString('fa-IR')), onChange = (e) => { } }: { date?: string, onChange?: (e: string) => {} | void }) {
    var todayDate = new Date();
    const today = FixNumbers(todayDate.toLocaleDateString('fa-IR'));
    const [selectedDate, setSelectedDate] = useState(date);
    const [displayMonth, setDisplayMonth] = useState(GetMonth(today));
    var shift = (selectedDate == '') ? 0 : (GetMonth(selectedDate) - GetMonth(today));
    const [monthShift, setMonthShift] = useState(shift);

    const year = GetYear(today);
    const month = GetMonth(today);
    const day = GetDay(today);
    const dayOfWeek = (todayDate.getDay() + 1) % 7;

    var firstDateOfMonth = new Date();
    firstDateOfMonth.setDate(todayDate.getDate() - day + 1);
    var firstDayOfMonth = (firstDateOfMonth.getDay() + 1) % 7;


    var currentDate = new Date();
    currentDate.setDate(firstDateOfMonth.getDate() - firstDayOfMonth - 1 + (28 * monthShift));

    return (
        <div className='cute-ui-persian-calendar'>
            <table>
                <thead>
                    <tr>
                        <th colSpan={7} >
                            <div className='navigator'>
                                <div className='header'>
                                </div>
                                <div className='header'>
                                    <Button rounded style={{ width: 30, height: 30, padding: 0 }} onClick={() => { setMonthShift((monthShift - 1)) }}>
                                        <Icon.ChevronRight size={20}></Icon.ChevronRight>
                                    </Button>
                                    <label>{GetMonthName(Math.abs(month + monthShift) % 12)}</label>
                                    <Button rounded style={{ width: 30, height: 30, padding: 0 }} onClick={() => { setMonthShift((monthShift + 1)) }}>
                                        <Icon.ChevronLeft size={20}></Icon.ChevronLeft>
                                    </Button>
                                </div>
                            </div>
                        </th>
                    </tr>
                    <tr>
                        <th className='cute-ui-day-title'>شنبه</th>
                        <th className='cute-ui-day-title'>یک‌شنبه</th>
                        <th className='cute-ui-day-title'>دوشنبه</th>
                        <th className='cute-ui-day-title'>سه‌شنبه</th>
                        <th className='cute-ui-day-title'>چهارشنبه</th>
                        <th className='cute-ui-day-title'>پنج‌شنبه</th>
                        <th className='cute-ui-day-title'>جمعه</th>
                    </tr>
                </thead>
                <tbody>
                    {([0, 1, 2, 3, 4]).map((weekNo, week_index) => {
                        return (
                            <tr key={week_index}>
                                {([0, 1, 2, 3, 4, 5, 6]).map((dayNo, day_index) => {
                                    currentDate.setDate(currentDate.getDate() + 1);
                                    var btn_date = FixNumbers(currentDate.toLocaleDateString('fa-IR'))
                                    var theme = (btn_date == selectedDate) ? Basic.theme.fill : Basic.theme.outline;
                                    var type = (dayNo == 6) ? Basic.type.danger : Basic.type.secondary;
                                    return (
                                        <td key={day_index}>
                                            <Button value={btn_date} type={type} theme={theme} active={btn_date == today} className='cute-ui-days' onClick={() => { onChange(ToDateFormat(btn_date)); setSelectedDate(btn_date) }} >{GetDay(btn_date).toString()}</Button>
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <th colSpan={7}>
                            <Button style={{ width: '100%' }} onClick={() => { setMonthShift(0); setSelectedDate(today) }} type={Basic.type.primary}>امروز</Button>
                        </th>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}