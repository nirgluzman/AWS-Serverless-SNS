const Responses = require('../common/API_Responses');

// https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/sns-examples-sending-sms.html
const AWS = require('aws-sdk');
const SNS = new AWS.SNS({ apiVersion: '2010-03-31' });

exports.handler = async (event) => {
  console.log('event', event);

  const body = JSON.parse(event.body);

  if (!body || !body.phoneNumber || !body.message) {
    return Responses._400({ message: 'missing required fields in the body' });
  }

  const AttributesParams = {
    attributes: {
      DefaultSMSType: 'Promotional',
    },
  };

  const messageParams = {
    Message: body.message,
    PhoneNumber: body.phoneNumber,
  };

  try {
    await SNS.setSMSAttributes(AttributesParams).promise();
    await SNS.publish(messageParams).promise();

    return Responses._200({ message: 'text message sent' });
  } catch (err) {
    console.log('error in SNS', err);
    return Responses._500({ message: err.message });
  }
};
