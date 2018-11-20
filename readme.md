# YelpCamp

## Initial Setup
Each Campground has:
   * Name
   * Image
## Users + Campgrounds
* Prevent an unauthenticated user from creating a campground
* Save username+id to newly created campground


## RESTFUL ROUTES


INDEX   /campgrounds
NEW     /campgrounds/new
CREATE  /campgrounds
SHOW    /campgrounds/:id

NEW     campgrounds/:id/comments/new    GET
CREATE  campgrounds/:id/comments      POST
