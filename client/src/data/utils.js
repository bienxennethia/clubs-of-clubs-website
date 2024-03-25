export const fetchClubTypes = () => {
  return fetch('http://localhost:3001/club-types')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch club types');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error fetching club types:', error);
      throw error;
    });
};

export const saveClubs = (clubData) => {
  return fetch('http://localhost:3001/clubs', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(clubData)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to save clubs');
    }
    return response.json();
  })
  .catch(error => {
    console.error('Error saving clubs:', error);
    throw error;
  });
};

export const getClubs = (id = null, type = null) => {
  if (type === 'all') { type = null; } 
  
  let url = 'http://localhost:3001/clubs';
  if (id) {
    url += `?id=${id}`;
  } else if (type) {
    url += `?type=${type}`; // Append type parameter to the URL
  }

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch clubs');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error fetching clubs:', error);
      throw error;
    });
};

export const updateClub = (id, clubData) => {
  const url = `http://localhost:3001/clubs/${id}`;

  return fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(clubData),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to update club');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error updating club:', error);
      throw error;
    });
};
