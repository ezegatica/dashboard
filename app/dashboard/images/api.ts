import { Files } from "./types";

export const fetchToken = async (): Promise<{token: string}> => {
    const data = await fetch('https://api.sirv.com/v2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'max-age=60'
      },
      body: JSON.stringify({
        clientId: process.env.SIRV_API_CLIENT_ID,
        clientSecret: process.env.SIRV_API_CLIENT_SECRET
      })
    });
    return data.json();
}

export const fetchImages = async (token: string): Promise<Files> => {
  const response = await fetch(
    'https://api.sirv.com/v2/files/readdir?dirname=%2Fimg',
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
    return response.json();
}

export const uploadImages = async (token: string, files: File[]): Promise<void> => {
  const generateRandomName = (file: File): string => {
    // Use this (20220821-1335R.jpg) format for the filename. The dates have to be the same as the actual date, not the file's date. The last letter has to be a random letter.
    // The format is (YYYYMMDD-HHMMR.{file.extension})
    // The R is for random letter.
    return `${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${new Date().toISOString().slice(11, 16).replace(/:/g, '')}${
      // Add a 50/50 chance of being uppercase or lowercase
      String.fromCharCode(97 + Math.floor(Math.random() * 26) + (Math.random() > 0.5 ? 0 : -32))
    }.${file.type.split('/').pop()}`;   
  }
  const namesSet = new Set<string>();


  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    let name;
    do {
      name = generateRandomName(file);
    } while (namesSet.has(name));
    namesSet.add(name)
  }

  await Promise.all(
    files.map((file, i) => {
      const filename = Array.from(namesSet.values())[i]
      const filenameDecoded = `/img/${filename}`; 
      const filenameEncoded = encodeURIComponent(filenameDecoded);
      return fetch(
        `https://api.sirv.com/v2/files/upload?filename=${filenameEncoded}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': `${file.type}`
          },
          body: file
        }
      );
    })
  )

}