import test from 'node:test';
import { SessionModel } from './session.model';
import assert from 'node:assert/strict';

test('SessionModel.getAveragePerWeek should return the correct number of sessions for the last 12 weeks', async () => {
  const userId = 'test-user-id';
  const sessions = await SessionModel.getAveragePerWeek({ userId, weekCount: 12 });
  assert.equal(sessions.length, 12, 'Expected 12 weeks of sessions');
});
