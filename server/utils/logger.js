const logger = {
    info: (...args) => {
        console.log(new Date().toISOString(), '[INFO]', ...args);
    },
    error: (...args) => {
        console.error(new Date().toISOString(), '[ERROR]', ...args);
    }
};

export default logger;