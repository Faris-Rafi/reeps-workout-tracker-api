import { SessionModel } from './models/session.model.ts';

const result = await SessionModel.thisMonthSessions({
  userId: '01a0f9b5-901d-7462-8c16-97fd246bd920',
  type: 'count',
});
console.log(result);
