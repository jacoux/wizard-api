export const createProductSchema = {
    name: { type: 'string', example: 'Werkuren', required: true },
    organizationId: { type: 'string', example: 'nkjnknk', required: true },
    vatPercentage: { type: 'number', example: '21', required: true },
    price: { type: 'number', example: '55,99', required: true },
    description: { type: 'string', example: 'test', required: true },
    isHourlyRate: { type: 'boolean', example: true, required: true },
}

export const updateProductSchema = {
    name: { type: 'string', example: 'Werkuren', required: true },
    organizationId: { type: 'number', example: '12345', required: true },
    vatPercentage: { type: 'number', example: '21', required: true },
    price: { type: 'number', example: '55,99', required: true },
    description: { type: 'string', example: 'test', required: true },
    isHourlyRate: { type: 'boolean', example: true, required: true }
}

export const requestProductValidationSchema = {
    type: 'object',
    properties: {
        _id: { type: 'string' },
        id: { type: 'string' },
        name: { type: 'string', minLength: 2, maxLength: 80 },
        description: { type: 'string', minLength: 2, maxLength: 80 },
        organizationId: { type: 'string' },
        vatPercentage: { type: 'number' },
        price: { type: 'number' },
        isHourlyRate: { type: 'boolean' },
    },
}
