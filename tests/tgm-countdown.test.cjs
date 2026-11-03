const test = require('node:test');
const assert = require('node:assert/strict');
const { START_AT, END_AT, countdownAt } = require('../assets/tgm-countdown.js');

test('campaign runs for exactly 48 hours from November 4, 9 pm Mexico City', () => {
  assert.equal(START_AT, Date.parse('2026-11-05T03:00:00Z'));
  assert.equal(END_AT, Date.parse('2026-11-07T03:00:00Z'));
  assert.equal(END_AT - START_AT, 48 * 60 * 60 * 1000);
  const mexico = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Mexico_City', weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
  }).formatToParts(START_AT);
  const parts = Object.fromEntries(mexico.map(part => [part.type, part.value]));
  assert.equal(parts.weekday, 'Wednesday');
  assert.equal(parts.day, '04');
  assert.equal(parts.hour, '21');
  assert.equal(parts.minute, '00');
});

test('does not start early and switches to 48:00:00 at the exact opening', () => {
  assert.equal(countdownAt(START_AT - 1).phase, 'scheduled');
  assert.deepEqual(countdownAt(START_AT), { phase: 'active', hours: 48, minutes: 0, seconds: 0 });
  assert.deepEqual(countdownAt(START_AT + 1000), { phase: 'active', hours: 47, minutes: 59, seconds: 59 });
});

test('a late arrival or a refreshed page uses the shared deadline', () => {
  const nextDay = Date.parse('2026-11-05T21:00:00-06:00');
  assert.deepEqual(countdownAt(nextDay), { phase: 'active', hours: 24, minutes: 0, seconds: 0 });
  assert.deepEqual(countdownAt(Date.parse('2026-11-06T03:00:00Z')), countdownAt(nextDay));
  assert.deepEqual(countdownAt(END_AT - 3601000), { phase: 'active', hours: 1, minutes: 0, seconds: 1 });
});

test('finishes at the deadline without negative time or restarting', () => {
  assert.deepEqual(countdownAt(END_AT - 1), { phase: 'active', hours: 0, minutes: 0, seconds: 1 });
  assert.deepEqual(countdownAt(END_AT), { phase: 'ended', hours: 0, minutes: 0, seconds: 0 });
  assert.equal(countdownAt(END_AT + 86400000).phase, 'ended');
});
