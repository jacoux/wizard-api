export const createClientSchema = {
    name: { type: 'string', example: 'Emmanuel', required: true },
    vat: { type: 'string', example: 'BE0704651352', required: true },
    email: { type: 'string', example: 'info@jacoux.be', required: true },
    responsible: { type: 'string', example: 'Niels', required: false },
    firstName: { type: 'string', example: 'Niels', required: false },
    projects: { type: 'array' },
    tel: { type: 'string', example: '9090909090', required: false },
    organizationId: { type: 'string', example: '12443344334', required: false },
    lastName: { type: 'string', example: 'Jacobs', required: false },
    address: {
        type: 'string',
        example: '44-65 Laparella Cinco, Donella, Mexico City, Mexico',
    },
    description: {
        type: 'string',
        example: 'A versatile back-end node.js developer',
    },
}

export const updateClientSchema = {
    name: { type: 'string', example: 'Emmanuel', required: true },
    vat: { type: 'string', example: 'BE0704651352', required: true },
    email: { type: 'string', example: 'info@jacoux.be', required: true },
    tel: { type: 'string', example: '9090909090', required: false },
    responsible: { type: 'string', example: 'Niels', required: false },
    projects: { type: 'array' },
    organizationId: { type: 'string', example: '12443344334', required: false },
    firstName: { type: 'string', example: 'Niels', required: false },
    lastName: { type: 'string', example: 'Jacobs', required: false },
    address: {
        type: 'string',
        example: '44-65 Laparella Cinco, Donella, Mexico City, Mexico',
    },
    description: {
        type: 'string',
        example: 'A versatile back-end node.js developer',
    },
}

export const requestClientValidationSchema = {
    type: 'object',
    properties: {
        _id: { type: 'string' },
        id: { type: 'string' },
        name: { type: 'string', minLength: 2, maxLength: 80 },
        vat: { type: 'string' },
        tel: { type: 'string' },
        email: { type: 'string' },
        projects: { type: 'array' },
        responsible: { type: 'string' },
        organizationId: { type: 'string' },
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        following: { type: 'array' },
        address: {
            type: 'string',
            minLength: 0,
            maxLength: 300
        },
        description: {
            type: 'string',
            minLength: 0,
            maxLength: 500
        },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
    },
    additionalProperties: false,
}
