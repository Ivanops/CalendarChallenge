import React from 'react';
import { render } from '@testing-library/react';
import {CalendarManager, ReminderModel} from './CalendarContext';

test('Ability to add a new "reminder"', () => {
  const calendarManager = new CalendarManager();
  const dayID = "ID_2020_08_01"
  const reminder = new ReminderModel();
  const first = 0;
  reminder.name = "Test Name Reminder!";
  calendarManager.saveReminder(dayID, reminder);
  expect(reminder.name).toEqual(calendarManager.dayData.get(dayID)?.remindersList[first].name);
});

test('Ability to add a new "reminder" Name lengh more than 30 characters', () => {
  const calendarManager = new CalendarManager();
  const dayID = "ID_2020_08_01"
  const reminder = new ReminderModel();
  reminder.name = "Test Name Reminder with more characters than its possible in this case, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  expect(false).toEqual(calendarManager.saveReminder(dayID, reminder));
});

test('Ability to add a new "reminder" city', () => {
  const calendarManager = new CalendarManager();
  const dayID = "ID_2020_08_01"
  const reminder = new ReminderModel();
  const first = 0;
  const city = "London";
  reminder.city = city;
  calendarManager.saveReminder(dayID, reminder);
  expect(city).toEqual(calendarManager.dayData.get(dayID)?.remindersList[first].city);
});


test('Ability to add a new "reminder" Name lengh more than 30 characters', () => {
  const calendarManager = new CalendarManager();
  const dayID = "ID_2020_08_01"
  const reminder = new ReminderModel();
  reminder.city = "Test City name with more characters than its possible in this case, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  expect(false).toEqual(calendarManager.saveReminder(dayID, reminder));
});

test('Ability to add a new "reminder" with bad hour', () => {
  const calendarManager = new CalendarManager();
  const dayID = "ID_2020_08_01"
  const reminder = new ReminderModel();
  reminder.hour = 50;
  expect(false).toEqual(calendarManager.saveReminder(dayID, reminder));
});

test('Ability to add a new "reminder" with bad minute', () => {
  const calendarManager = new CalendarManager();
  const dayID = "ID_2020_08_01"
  const reminder = new ReminderModel();
  reminder.minutes = 200;
  expect(false).toEqual(calendarManager.saveReminder(dayID, reminder));
});