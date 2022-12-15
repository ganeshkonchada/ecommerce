module.exports = {
  responseObject: (data, message, status, count) => {
    return { data, message, status, count };
  },
  errorResponse: (data, message, status) => {
    return { data, message, status };
  },
  successResponse: (data, count, message, status) => {
    return { data, count, message, status };
  }
};
