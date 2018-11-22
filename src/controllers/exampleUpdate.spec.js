import { expect } from 'chai';
// import sinon from 'sinon';
import mongoose from 'mongoose';
import { Mockgoose } from 'mockgoose';
import AuditLog from '../models/audit-log';
import { open } from '../lib/mongodb-connect';

const mockgoose = new Mockgoose(mongoose);

describe('Mongoose actions', () => {
  before((done) => {
    open().then(() => {
      done();
    }).catch(done);
  });

  afterEach((done) => {
    mockgoose.helper.reset();
    done();
  });

  it('framwork test', async () => {
    expect(true).to.equal(true);
  });

  it('can add a document', async () => {
    const logEntry = new AuditLog({
      salesForceRequestId: 'R100ESBOther',
      customerEmailAddress: 'd@d.com',
      loggedBy: 'dave',
      logTime: Date.now(),
      remainingDays: 3,
      actionDescription: 'Something happening',
      expectedCompletionDate: '2018-02-20T11:02:13.924Z',
    });

    await logEntry.save();

    const recordInDB = await AuditLog.findOne({ salesForceRequestId: 'R100ESBOther' });

    expect(recordInDB).to.include({ 
      salesForceRequestId: 'R100ESBOther',
      customerEmailAddress: 'd@d.com',
      loggedBy: 'dave',
      remainingDays: 3,
      actionDescription: 'Something happening',
    });
  });

  it('can add multiple documents', async () => {
    const logEntry1 = new AuditLog({
      salesForceRequestId: '1',
      customerEmailAddress: '1@1.com',
      loggedBy: 'one',
      logTime: Date.now(),
      remainingDays: 3,
      actionDescription: 'Something happening1',
      expectedCompletionDate: '2018-02-20T11:02:13.924Z',
    });

    const logEntry2 = new AuditLog({
      salesForceRequestId: '2',
      customerEmailAddress: '2@2.com',
      loggedBy: 'two',
      logTime: Date.now(),
      remainingDays: 3,
      actionDescription: 'Something happening2',
      expectedCompletionDate: '2018-02-20T11:02:13.924Z',
    });

    const logEntry3 = new AuditLog({
      salesForceRequestId: '3',
      customerEmailAddress: '3@3com',
      loggedBy: 'three',
      logTime: Date.now(),
      remainingDays: 3,
      actionDescription: 'Something happening3',
      expectedCompletionDate: '2018-02-20T11:02:13.924Z',
    });

    await AuditLog.insertMany([logEntry1, logEntry2, logEntry3]);

    const recordInDB = await AuditLog.findOne({ salesForceRequestId: '2' });

    expect(recordInDB).to.include({
      salesForceRequestId: '2',
      customerEmailAddress: '2@2.com',
      loggedBy: 'two',
      remainingDays: 3,
      actionDescription: 'Something happening2',
    });
  });
});
