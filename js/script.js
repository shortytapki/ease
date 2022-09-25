const fetchData = async () => {
  const response = await fetch(
    'https://private-anon-b86aaf46c1-lampshop.apiary-mock.com/lamps',
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const data = await response.json();
  console.log(data);
};
