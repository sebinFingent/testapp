'use client';

import * as React from 'react';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

function TimePickerViews() {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['TimePicker', 'TimePicker', 'TimePicker']}>
          <DemoItem label={'"hours", "minutes" and "seconds"'}>
            <TimePicker views={['hours', 'minutes', 'seconds']} />
          </DemoItem>
        </DemoContainer>
      </LocalizationProvider>
    );
  }

  
export default TimePickerViews;