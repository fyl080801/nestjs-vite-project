export const getCallerFile = () => {
  let filename: string;

  const pst = Error.prepareStackTrace;
  Error.prepareStackTrace = (err, stack) => {
    return stack;
  };

  return (err: Error) => {
    try {
      let callerfile;

      const currentfile = (<NodeJS.CallSite[]>(err.stack as unknown))
        .shift()
        .getFileName();

      while (err.stack.length) {
        callerfile = (<NodeJS.CallSite[]>(err.stack as unknown))
          .shift()
          .getFileName();

        if (currentfile !== callerfile) {
          filename = callerfile;

          break;
        }
      }
    } catch (err) {}

    Error.prepareStackTrace = pst;

    return filename;
  };
};
