# Dojo

#### _made by a restaurant worker, for restaurant workers_

management application for restaurants

## Abstract

**Moderator** (initial bistro creater OR assigned afterwards by one)

- manage members, positions, and overall tip information

**Member**

- view modify their own information - hours

# Features

#### general auth & navigation

- [x] OAuth2.0 login
- [x] basic routes/pages
- [x] redirect
- [x] bistro invite link, join bistro request flow

# pages

**/bistro**

- [x] OSM search
- [x] integrate map
  - [x] map marker
  - [x] auto zoom on found places
- [] make placeButtons more pleasing for places with longer info (hide initially, extend on click)

<br/>

**/bistro/[bistroId]/Home**

- [x] positions
  - [x] create & delete
  - [x] view
  - [x] assign/remove user
  - [] update
- []

/bistro/[bistroId]/pay

- [ ] tipForm CRUD
  - [ ] add variables
  - [ ] tipForm equation keyboard
- [ ] Tip

- [ ] Menu

_powered by [T3 Stack](https://create.t3.gg/), [Nominatim](https://nominatim.org/), and [React Leaflet](https://react-leaflet.js.org/)_
