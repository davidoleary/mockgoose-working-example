const POST = async (req, res) => {
  const document = await AuditLog.findOne({ salesForceRequestId: data.salesForceRequestId }).sort([['_id', -1]]);

  if (!document) {
    const newLogEntry = new AuditLog({
      salesForceRequestId: data.salesForceRequestId,
      customerEmailAddress: data.customerEmail,
      loggedBy: data.loggedBy,
      logTime: Date.now(),
      actionDescription: '',
      expectedCompletionDate: data.expectedCompletionDate,
    });

    const response = await newLogEntry.save();
    const responseData = response.toObject();

    res.send(responseData);
    return;
  }
};

export default {
  POST,
};
