"use client";
import colors from "@/utils/colors";
import { Flex, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useState } from "react";
import { CommonSelect } from "./CommonSelect";

interface DatePickerProps {
  isInvalid?: boolean;
  onDateChange?: (year: string, month: string, day: string) => void;
}

export const DatePicker = ({ isInvalid, onDateChange }: DatePickerProps) => {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDay, setSelectedDay] = useState("");

  const years = Array.from({ length: 106 }, (_, i) => {
    const year = 2025 - i;
    return { label: year.toString(), value: year.toString() };
  });

  const months = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    return { label: month.toString(), value: month.toString() };
  });

  const days = Array.from({ length: 31 }, (_, i) => {
    const day = i + 1;
    return { label: day.toString(), value: day.toString() };
  });

  const handleYearChange = (value: string) => {
    setSelectedYear(value);
    if (onDateChange) {
      onDateChange(value, selectedMonth, selectedDay);
    }
  };

  const handleMonthChange = (value: string) => {
    setSelectedMonth(value);
    if (onDateChange) {
      onDateChange(selectedYear, value, selectedDay);
    }
  };

  const handleDayChange = (value: string) => {
    setSelectedDay(value);
    if (onDateChange) {
      onDateChange(selectedYear, selectedMonth, value);
    }
  };

  return (
    <DatePickerContainer>
      <YearSelect>
        <CommonSelect
          placeholder="연도"
          items={years}
          isInvalid={isInvalid}
          onValueChange={handleYearChange}
        />
        <Text>년</Text>
      </YearSelect>
      <MonthSelect>
        <CommonSelect
          placeholder="월"
          items={months}
          isInvalid={isInvalid}
          onValueChange={handleMonthChange}
        />
        <Text>월</Text>
      </MonthSelect>
      <DaySelect>
        <CommonSelect
          placeholder="일"
          items={days}
          isInvalid={isInvalid}
          onValueChange={handleDayChange}
        />
        <Text>일</Text>
      </DaySelect>
    </DatePickerContainer>
  );
};

const DatePickerContainer = styled(Flex)`
  width: 100%;
  height: 100%;
  gap: 20px;
`;

const YearSelect = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  flex: 2;
  color: ${colors.gray[7]};
`;

const MonthSelect = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: ${colors.gray[7]};
`;

const DaySelect = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: ${colors.gray[7]};
`;

export default DatePicker;