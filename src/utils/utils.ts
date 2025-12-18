const getImagePrefix = () => {
  return process.env.NODE_ENV === "test"
    ? "/Crypgo/"
    : "";
};

export { getImagePrefix };
 
