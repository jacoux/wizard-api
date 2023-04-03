export const createOrganizationSchema = {
    name: { type: 'string', example: 'Emmanuel', required: true },
    companyVat: { type: 'string', example: 'BE0704651352', required: true },
    accountType: { type: 'string', example: 'test', required: true },
    address: {
        type: 'string',
        example: '44-65 Laparella Cinco, Donella, Mexico City, Mexico',
    },
    employee: {
        type: 'string',
        example: '44-65 Laparella Cinco, Donella, Mexico City, Mexico',
    },
    description: {
        type: 'string',
        example: 'A versatile back-end node.js developer',
    },
}

export const updateOrganizationSchema = {
    name: { type: 'string', example: 'Emmanuel', required: true },
    companyVat: { type: 'string', example: 'BE0704651352', required: true },
    employee: { type: 'string', example: 'BE0704651352', required: true },
    accountType: { type: 'string', example: 'BE0704651352', required: true },
    address: {
        type: 'string',
        example: '44-65 Laparella Cinco, Donella, Mexico City, Mexico',
    },
    description: {
        type: 'string',
        example: 'A versatile back-end node.js developer',
    },
}

export const requestOrganizationValidationSchema = {
    type: 'object',
    properties: {
        _id: { type: 'string' },
        id: { type: 'string' },
        accountType: { type: 'string' },
        companyEmail: { type: 'string' },
        employee: { type: 'string' },
        name: { type: 'string', minLength: 2, maxLength: 80 },
        companyVat: { type: 'string', minLength: 2, maxLength: 20 },
        email: { type: 'string', format: 'email' },
        following: { type: 'array' },
        sector: { type: 'array' },
        address: {
            type: 'string',
            minLength: 0,
            maxLength: 300,
        },
        description: {
            type: 'string',
            minLength: 0,
            maxLength: 500,
        },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
    },
    additionalProperties: false,
}
