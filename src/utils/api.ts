export const getHeaders = () => {
  return {
    Authorization: `Bearer ${process.env.AMOCRM_ACCESS_TOKEN}`,
  };
};
