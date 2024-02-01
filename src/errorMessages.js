const errorMessages = {
    missingToken: "Missing authorisation token",
    unauthorisedUser: "Unauthorised user",
    insufficientPermissons: "You do not have sufficient permission.",
    noPost: "Post does not exist",
    noUser: "User does not exist",
    existingUsername: "A user with the provided username already exists",
    invalidUserId: "A user with the provided ID does not exist",
    defaultErr: "Oops, something went wrong.",
    missingFields: "Missing fields in request body",
    validRoles: "Valid roles are 'USER' or 'ADMIN'"
}

module.exports = errorMessages