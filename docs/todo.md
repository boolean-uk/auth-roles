# TODO

## set up / prep

- [x] set up db + env
- [x] go through the test, identify requirements
- [x] have a go at writin api specs as a .yml
- [x] update schema prisma
- [x] plan

## routers

- [ ] add get users route
- [ ] add post users login route
- [ ] add delete user route
- [ ] add delete post route
- [ ] add relevant middleware to relevant routes
  
## controllers

- [ ] add get users route
- [ ] add delete user route
- [ ] add delete post route
  
## middleware

- [ ] add verifyToken
  - [ ] (throw 401 (unauthorised -> login required) if no token malformed?)
  - [ ] throw 403 token malformed
- [ ] add verifyAdminRole
  - [ ] throw 403 if user is not an admin
- [ ] add validateInput
  - [ ] throw 400 if fields missing
