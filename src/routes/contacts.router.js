const express = require('express');
const contactsController = require('../controllers/contacts.controller');
const { methodNotAllowed } = require('../controllers/errors.controller');
const swaggerJSDoc = require('swagger-jsdoc');
const { swaggerUi } = require('../docs/swagger');
const router = express.Router();
module.exports.setup = (app) => {
    app.use('/api/v1/contacts', router);
/**
 * @openapi
 * /api/v1/contacts:
 *   get:
 *     summary: get contacts by filter
 *     description: get contacts by filter
 *     parameters:
 *       - name: favorite
 *         in: query
 *         description: Filter by favorite status
 *         schema:
 *           type: boolean
 *       - name: name
 *         in: query
 *         description: Filter by contact name
 *         schema:
 *           type: string
 *     tag:
 *        - contacts
 *     responses:
 *       200:
 *         description: A list of contacts
 *         content:
 *            application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      status:
 *                          type: string
 *                          description: The response status 
 *                          enum: [success]
 *                      data:
 *                          type: object
 *                          properties:
 *                              contacts:
 *                                  type: array
 *                                  items: 
 *                                      $ref: '#/components/schemas/Contact'
 */
    router.get('/', contactsController.getContactsByFilter);
 
/**
 * @openapi
 * /api/v1/contacts:
 *   post:
 *     summary: Create a new contact
 *     description: Create a new contact
 *     requestBody:
 *          require: true
 *          content: 
 *              multipart/form-data:
 *                  schema:
 *                      $ref: '#/components/schemas/Contact'
 * 
 *     tag:
 *        - contacts
 *     responses:
 *       201:
 *         description: A new contact
 *         content:
 *            application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      status:
 *                          type: string
 *                          description: The response status 
 *                          enum: [success]
 *                      data:
 *                          type: object
 *                          properties:
 *                              contact:  
 *                                      $ref: '#/components/schemas/Contact'
 */    
    router.post('/', contactsController.createContact);
/**
 * @openapi
 *  /api/v1/contacts:
 *      delete:
 *          summary: Delete all contacts
 *          description: Delete all contacts
 *          tags:
 *              - contacts
 *          responses:
 *              200:
 *                  description: All contacts deleted
 *                  $ref: '#/components/respon/200NoData'
 */
    router.delete('/', contactsController.deleteAllContacts);
    router.all('/',methodNotAllowed);

    /**
     * @openapi
     *  /api/v1/contacts/{id}:
     *      get:
     *          summary: Get contact by ID
     *          description: Get contact by ID
     *          parameters:
     *              - $ref: '#/components/parameters/contactIdParam'
     *          tags:
     *              - contacts
     *          responses:
     *              200:
     *                  description: A contact
     *                  content:
     *                      application/json:
     *                          schema:
     *                              type: object
     *                              properties:
     *                                  status:
     *                                      type: string
     *                                      description: The response status
     *                                      enum: [success]
     *                                  data:
     *                                      type: object
     *                                      properties:
     *                                          contact:
     *                                              $ref: '#/components/schemas/Contact'
     */
    router.get('/:id', contactsController.getContact);
    
/**
 * @openapi
 *  /api/v1/contacts/{id}:
 *      put:
 *          summary: Update contact by ID
 *          description: Update contact by ID
 *          parameters:
 *              - $ref: '#/components/parameters/contactIdParam'
 *          requestBody:
 *              required: true
 *              content:
 *                  mutipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Contact'
 *          tags:
 *              - contacts
 *          responses:
 *              200:
 *                  description: An updated contact
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  status:
 *                                      type: string
 *                                      description: The response status
 *                                      enum: [success]
 *                                  data:
 *                                      type: object
 *                                      properties:
 *                                          contact:
 *                                              $ref: '#/components/schemas/Contact'
 */
    router.put('/:id', contactsController.updateContact);
/**
 * @openapi
 *  /api/v1/contacts/{id}:
 *      delete:
 *          summary: Delete contact by ID
 *          description: Delete contact by ID
 *          parameters:
 *              - $ref: '#/components/parameters/contactIdParam'
 *          tags:
 *              - contacts
 *          response:
 *              200:
 *                  description: Contact deleted
 *                  $ref: '#/components/responses/200NoData'
 */    
    router.delete('/:id', contactsController.deleteContact);
    router.all('/:id',methodNotAllowed);
};