export const getHeaders = () => {
  return {
    Authorization: `Bearer ${process.env.AMOCRM_ACCESS_TOKEN}`,
  };
};

export const getApiUri = () => `${process.env.AMOCRM_API_URL}/v4`;
