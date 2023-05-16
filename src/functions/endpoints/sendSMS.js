// https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/sns-examples-sending-sms.html

exports.handler = async (event) => {
  console.log('event', event);

  const body = JSON.parse(event.body);
};
