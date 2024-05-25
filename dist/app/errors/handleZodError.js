"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// define handle zod error function
const handleZodError = (error) => {
    // generate error message
    const errorMessage = error.issues
        .map((issue) => `${issue.message}`)
        .join(". ");
    return {
        success: false,
        message: errorMessage,
        errorDetails: {
            issues: error.issues.map((issue) => ({
                message: issue.message,
                field: issue.path[issue.path.length - 1],
            })),
        },
    };
};
exports.default = handleZodError;
