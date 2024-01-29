import { Router } from "express";
import { checkSchema, matchedData, query, validationResult } from "express-validator";
import { mockUsers } from "../../utils/constants.mjs";
import { createUserValidation } from "../../utils/validationSchemas.mjs";



const checkingUserById = (req, res, next) => {
    const { params: { id } } = req
    const parsedId = parseInt(id)
    if (isNaN(parsedId)) return res.status(400).send('Invalid id.')
    const findUserIndex = mockUsers.findIndex(user => user.id === parsedId)
    if (findUserIndex === -1) return res.status(400).send('User not found')
    req.findUserIndex = findUserIndex
    next()
}

const router = Router()

router.get('/api/users', query('filter').isString().withMessage('filter must be string').notEmpty()
    .withMessage('filter must not be empty'), (req, res) => {
        const result = validationResult(req)
        const { query: { filter, value } } = req ?? ""
        const CONDITION = filter && value
        if (CONDITION) return res.send(mockUsers.filter(user => user[filter].includes(value)))
        if (!CONDITION) return res.send(mockUsers)
    })
router.get('/api/users/:id', checkingUserById, ({ findUserIndex }, res) => {
    const user = mockUsers[findUserIndex]
    if (!user) return res.status(404).send('User not found')
    return res.send(user)

})

router.post('/api/users', checkSchema(createUserValidation), (req, res) => {
    const result = validationResult(req)
    if (!result.isEmpty()) return res.send({ errors: result.array() })
    const data = matchedData(req.body)
    const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...data }
    mockUsers.push(newUser)
    return res.send('201')
})

router.put("/api/users/:id", checkingUserById, ({ body, findUserIndex }, res) => {
    mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body }
    return res.sendStatus(200)
})

router.patch("/api/users/:id", checkingUserById, ({ body, findUserIndex }, res) => {


    mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body }
    return res.sendStatus(200)

})

router.delete("/api/users/:id", checkingUserById, ({ findUserIndex }, res) => {
    mockUsers.splice(findUserIndex, 1)
    return res.sendStatus(200)
})

export default router;