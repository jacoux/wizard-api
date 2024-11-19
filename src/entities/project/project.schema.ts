export const createProjectSchema = {

    name: { type: 'string', example: 'Project 1', required: true },
    projectNumber: { type: 'number', example: '1', required: false },
    startDate: { type: 'string', example: '19/01/2021', required: false },
    endDate: { type: 'string', example: '19/01/2021', required: false },
    organizationId: { type: 'string', example: '12443344334', required: false },
    amountOfProjectMembers: { type: 'number', example: '3', required: false },
    priority: { type: 'string', example: 'low', required: false },
    client: { type: 'string', example: 'low', required: false },
    projectResponsiblePerson: { type: 'string', example: 'Niels', required: false },
    status: { type: 'string', example: 'ongoing', required: false },
    linkedProjects: { type: 'array', example: '[{projectid:1}]', required: false },
    maxBudget: { type: 'number', example: '6000', required: false },
    currentBudget: { type: 'number', example: '3000', required: false },
    currency: { type: 'string', example: 'euro', required: false },
    invoices: { type: 'string', example: '[{projectid:1}]', required: false },
    description: {
        type: 'string',
        example: 'A versatile back-end node.js developer',
    },
}

export const updateProjectSchema = {
    name: { type: 'string', example: 'Project 1', required: true },
    projectNumber: { type: 'number', example: '1', required: false },
    startDate: { type: 'string', example: '19/01/2021', required: false },
    endDate: { type: 'string', example: '19/01/2021', required: false },
    organizationId: { type: 'string', example: '12443344334', required: false },
    client: { type: 'string', example: '12443344334', required: false },
    amountOfProjectMembers: { type: 'number', example: '3', required: false },
    priority: { type: 'string', example: 'low', required: false },
    projectResponsiblePerson: { type: 'string', example: 'Niels', required: false },
    status: { type: 'string', example: 'ongoing', required: false },
    linkedProjects: { type: 'array', example: '[{projectid:1}]', required: false },
    maxBudget: { type: 'number', example: '6000', required: false },
    currentBudget: { type: 'number', example: '3000', required: false },
    currency: { type: 'string', example: 'euro', required: false },
    invoices: { type: 'array', example: '[{projectid:1}]', required: false },
    description: {
        type: 'string',
        example: 'A versatile back-end node.js developer',
    },
}

export const requestProjectValidationSchema = {
    type: 'object',
    properties: {
        _id: { type: 'string' },
        id: { type: 'string' },
        name: { type: 'string', minLength: 2, maxLength: 80 },
    }
}
