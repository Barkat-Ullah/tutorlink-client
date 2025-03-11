"use server"

export const getNews= async () => {
  try {
      const apiKey = process.env.NEWS_API_KEY;
    const res = await fetch(`https://newsapi.org/v2/everything?q=apple&from=2025-03-05&to=2025-03-05&sortBy=popularity&apiKey=${apiKey}`, {
      
    });
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};