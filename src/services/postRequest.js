const postRequest = async (bodyData, url) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(bodyData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();
    const result = JSON.stringify(json);
    // console.log('Success:', result);
    return JSON.parse(result);
  } catch (error) {
    console.error('Error:', error);
  }
};

export default postRequest;
