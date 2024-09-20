const contactsServices = require('../services/contacts.service');
const ApiError = require('../api-error');
const JSend = require('../jsend');


async function createContact(req, res, next){
    if (!req.body?.name || typeof req.body.name != 'string' ){
        return next(new ApiError(400,'Name should be a non-empty string'));
    }

    try {
        const contact = await contactsServices.createContact({
            ...req.body,
            avatar: req.file ? '/public/uploads/${req.file.filename}' : null,
        });
        return res
            .status(201)
            .set({
                Location: '${req.baseUrl}/${contact.id}',

        })
        .json(
            JSend.success({
                contact,
            })
        );

}   catch (error){
    console.log(error);
    return next(
        new ApiError(500,'An error occurred while creating the contact')
        );
    }
}

async function getContactsByFilter(req,res,next) {
    let result = {
        contacts : [],
        metadata: {
            totalRecords: 0,
            firstPage: 1,
            lastPage: 1,
            page: 1,
            linit:5,
        },
    };

    try {
        result = await contactsServices.getManyContacts(req.query);

    }catch (error){
    console.log(error);
    return next(
        new ApiError(500,'An error occurred while retrieving contacts')
        );
    }
    return res.json(
        JSend.success({
            contacts: result.contacts,
            metadata: result.metadata,
        })
    );
}
async function getContact(req,res,next) {
    const {id} = req.params;

    try{
        const contact = await contactsServices.getContactById(id);
        if(!contact){
            return next(new ApiError(404,'Contact not found'));
        }
        return res.json(JSend.success({ contact }));
    } catch (error){
        console.log(error);
        return next(new ApiError(500,'Error retrieving contact with id=${id}'));
    }
    
}

async function updateContact(req, res, next) {
    // Check if the request body is empty and no file is uploaded
    if (Object.keys(req.body).length === 0 && !req.file) {
        return next(new ApiError(400, 'Data to update cannot be empty'));
    }
    
    const { id } = req.params;

    try {
        // Update the contact by merging body data and avatar (if provided)
        const updated = await contactsServices.updateContact(id, {
            ...req.body,
            avatar: req.file ? `/public/uploads/${req.file.filename}` : null,  
        });

        // If no contact is found, return a 404 error
        if (!updated) {
            return next(new ApiError(404, 'Contact not found'));
        }

        // Return the updated contact as a JSON response
        return res.json(
            JSend.success({
                contact: updated,
            })
        );
    } catch (error) {
        console.error(error);
        return next(new ApiError(500, `Error updating contact with id=${id}`));  
    }
}


async function deleteContact(req,res,next){
    const {id} = req.params;

    try{
        const deleted = await contactsServices.deleteContact(id);
        if (!deleted){
            return next(new ApiError(404,'Contact not found'));

        }
        return res.json(JSend.success());
    }catch (error){
        console.log(error);
        return next(new ApiError(500,'Could not delete contact with id=${id}'));
    }
}



async function deleteAllContacts(req, res, next) {
    try{
        await contactsServices.deleteAllContacts();

        return res.json(JSend.success());
    }catch (error){
        console.log(error);
        return next(
            new ApiError(500,'An error occurred while removing all contacts')
        );
    }

}


module.exports = {
    getContactsByFilter,
    deleteAllContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact,
};