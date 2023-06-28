# [Dojo](https://dojo-six-woad.vercel.app/bistro)

> fullstack management application - _made by a restaurant worker, for restaurant workers_

_[Deployed](https://dojo-six-woad.vercel.app/bistro) on [Vercel](https://vercel.com/) with [Railway](https://railway.app/) MySQL DB instance_

_Powered by [T3 Stack](https://create.t3.gg/), [Nominatim](https://nominatim.org/), and [React Leaflet](https://react-leaflet.js.org/)_

## abstract user story

**Moderator** (initial bistro creater OR assigned afterwards by one)

- manage members, positions, and overall tip information

**Member**

- view modify their own information - hours

</br>

## Features

### **general auth & navigation**

- [x] OAuth2.0 login
- [x] basic routes/pages
- [x] redirect
- [x] bistro invite link, join bistro request flow

</br>

### _**Pages**_

#### **/bistro**

- [x] OSM search
- [x] integrate map
  - [x] map marker
  - [x] auto zoom on selected place

#### **/bistro/[bistroId]/Home**

- [x] positions
  - [x] create & delete
  - [x] view
  - [x] assign/remove user
  - [x] update
    - [ ] set user tip %

position tip % and within position tip %

#### **/bistro/[bistroId]/pay**

- [ ] tipForm CRUD (single form)
  - [ ] add variables
  - [ ] tipForm equation keyboard (numbers, tip variables)
- [ ] Tip
- [ ] Menu

# TODO

- [ ] change protectedBistroMember procedure to take in explicit bistroId (hard to understand implicit query param parsing at the API-end)
