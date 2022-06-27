const express = require('express');

const router = express.Router();

const ctrl = require('../../controllers/contacts');

const { validation, isValidId, statusValidate } = require('../../midelwares');

const { schemas } = require('../../models/contact');

const { ctrlWrapper } = require('../../helpers');


router.get('/', ctrlWrapper(ctrl.listContacts));

router.get('/:contactId', isValidId, ctrlWrapper(ctrl.getContactById));

router.post('/', validation(schemas.addSchema), ctrlWrapper(ctrl.addContact));

router.delete('/:contactId', isValidId, ctrlWrapper(ctrl.removeContact));

router.put('/:contactId', isValidId, validation(schemas.addSchema), ctrlWrapper(ctrl.editContact));

router.patch('/:contactId/favorite', statusValidate, isValidId, validation(schemas.updateFavorite), ctrlWrapper(ctrl.updateStatusContact));

module.exports = router
