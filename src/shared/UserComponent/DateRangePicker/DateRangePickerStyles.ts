import { Theme } from '@mui/material';

export const getDateRangePickerStyles = (theme: Theme) => {
  const isDarkMode = theme.palette.mode === 'dark';

  return {
    wrapper: {
      mt: 2,
      direction: 'ltr',   
        '& .rdrCalendarWrapper': {
          backgroundColor: isDarkMode ? theme.palette.background.paper : '#ffffff',
          color: isDarkMode ? theme.palette.text.primary : '#000000',
        },
        "& .rdrDateDisplayWrapper":{
          backgroundColor: isDarkMode ? theme.palette.background.default : '#f7f7f7',
          borderColor: isDarkMode ? theme.palette.divider : '#afafaf',
          color: isDarkMode ? theme.palette.text.primary : '#000000',
        },
        '& .rdrDateDisplayItem': {
          backgroundColor: isDarkMode ? theme.palette.background.default : '#f7f7f7',
          borderColor: isDarkMode ? theme.palette.divider : '#afafaf',
          color: isDarkMode ? theme.palette.text.primary : '#000000',
        },
        '& .rdrDateDisplayItemActive': {
          borderColor: isDarkMode ? theme.palette.primary.main : '#3d91ff',
        },
        '& .rdrDateInput input': {
          color: isDarkMode ? theme.palette.text.primary : '#000000',
        },
        '& .rdrMonthName': {
          color: isDarkMode ? theme.palette.text.secondary : '#849095',
        },
        '& .rdrWeekDay': {
          color: isDarkMode ? theme.palette.text.secondary : '#849095',
        },
        '& .rdrDay': {
          color: isDarkMode ? theme.palette.text.primary : '#1d2429',
        },
        '& .rdrDayNumber span': {
          color: isDarkMode ? theme.palette.text.primary : 'inherit',
        },
        '& .rdrDayDisabled': {
          color: isDarkMode ? theme.palette.text.disabled : '#cdcdcd',
          background: 'transparent !important',
        },
        '& .rdrDayDisabled .rdrDayNumber span': {
          color: isDarkMode ? theme.palette.text.disabled : '#cdcdcd',
        },
        '& .rdrDayPassive.rdrDayDisabled': {
          background: 'transparent !important',
        },
        '& .rdrDayPassive.rdrDayDisabled .rdrDayNumber span': {
          color: isDarkMode ? `${theme.palette.text.disabled} !important` : '#cdcdcd !important',
        },
        '& .rdrDayPassive': {
          background: 'transparent !important',
        },
        '& .rdrDayToday .rdrDayNumber span': {
          color: isDarkMode ? theme.palette.primary.main : '#3d91ff',
        },
        '& .rdrDayToday .rdrDayNumber span:after': {
          backgroundColor: isDarkMode ? theme.palette.primary.main : '#3d91ff',
        },
        '& .rdrMonthAndYearWrapper': {
          backgroundColor: isDarkMode ? theme.palette.background.paper : 'transparent',
        },
        '& .rdrMonthAndYearPickers select': {
          color: isDarkMode ? theme.palette.text.primary : '#1d2429',
          backgroundColor: isDarkMode ? theme.palette.background.paper : '#fff',
        },
        '& .rdrNextPrevButton': {
          backgroundColor: isDarkMode ? "#585c63": '#e7e7e7',
        },
        '& .rdrNextPrevButton:hover': {
          backgroundColor: isDarkMode ? theme.palette.action.hover : '#ffffff',
        },
        '& .rdrNextButton i': {
          borderLeftColor : isDarkMode ? theme.palette.text.secondary :'#acb3bf',
        },
        '& .rdrPprevButton i': {
          borderRightColor : isDarkMode ? theme.palette.text.secondary :'#acb3bf',
        },
        '& .rdrMonthAndYearPickers select option': {
          backgroundColor: isDarkMode ? theme.palette.background.paper : '#fff',
          color: isDarkMode ? theme.palette.text.primary : '#000',
        },
        '& .rdrDayStartPreview, & .rdrDayEndPreview, & .rdrDayInPreview': {
          borderColor: isDarkMode ? `${theme.palette.primary.main}40` : '#3d91ff40',
        },
        '& .rdrDayStartOfMonth, & .rdrDayStartOfWeek, & .rdrDayStartOfMonth, & .rdrDayStartOfWeek': {
          borderColor: isDarkMode ? theme.palette.background.paper : '#fff',
        },
        '& .rdrInRange': {
          backgroundColor: isDarkMode ? `${theme.palette.primary.main}30` : '#3d91ff40',
          color: isDarkMode ? theme.palette.text.primary : '#000',
        },
        '& .rdrStartEdge, & .rdrEndEdge': {
          background: isDarkMode ? theme.palette.primary.dark : '#3d91ff',
        },
        '& .rdrStartEdge .rdrDayNumber span, & .rdrEndEdge .rdrDayNumber span': {
          color: '#ffffff !important',
        },
        '& .rdrDaySelected': {
          backgroundColor: isDarkMode ? `${theme.palette.primary.dark}` : '#3d91ff',
        },
        '& .rdrDaySelected .rdrDayNumber span': {
          color: '#ffffff',
        },
        '& .rdrDateRangePickerWrapper': {
          backgroundColor: isDarkMode ? theme.palette.background.paper : '#fff',
        },
        '& .rdrDefinedRangesWrapper': {
          backgroundColor: isDarkMode ? theme.palette.background.default : '#fff',
          borderColor: isDarkMode ? theme.palette.divider : '#eff2f7',
        },
        '& .rdrStaticRangeLabel': {
          color: isDarkMode ? theme.palette.text.secondary : '#3d91ff',
        },
        '& .rdrInputRange': {
          color: isDarkMode ? theme.palette.text.secondary : '#849095',
        },
        '& .rdrInputRangeInput': {
          color: isDarkMode ? theme.palette.text.primary : '#1d2429',
          backgroundColor: isDarkMode ? theme.palette.background.paper : '#fff',
       
      
  }
    }}}