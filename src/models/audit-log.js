import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const AuditLogSchema = new Schema({
  salesForceRequestId: { type: String, required: true },
  customerEmailAddress: { type: String },
  loggedBy: { type: String, required: true },
  logTime: { type: Date, required: true },
  remainingDays: Number,
  actionDescription: String,
  errorCode: String,
  errorDescription: String,
  expectedCompletionDate: Date,
});

// export like this to prevent OverwriteModelError during integration tests
export default mongoose.models.AuditLog || mongoose.model('AuditLog', AuditLogSchema);
