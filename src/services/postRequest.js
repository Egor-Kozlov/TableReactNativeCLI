const postRequest = async (DATA, URL) => {
  try {
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(DATA),
    });
    const result = await response.json();

    if (result) {
      return result;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default postRequest;
