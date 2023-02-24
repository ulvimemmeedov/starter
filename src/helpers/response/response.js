const response = {
    success: (data) => {
        return {
            success: true,
            data,
        };
    },
    error: (message) => {
        return {
            success: false,
            message,
        };
    },
};

module.exports = response;
