const shouldLog = true;

export const Logger = (log) => {
  if (!shouldLog) {
    console.log(log);
  }
};
