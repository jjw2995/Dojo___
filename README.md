# [Dojo](https://dojo-six-woad.vercel.app/bistro)

> _made by a restaurant worker, for restaurant workers_

fullstack management application _[deployed](https://dojo-six-woad.vercel.app/bistro) on [Vercel](https://vercel.com/) with [Railway](https://railway.app/) MySQL DB instance - powered by [T3 Stack](https://create.t3.gg/), [Nominatim](https://nominatim.org/), and [React Leaflet](https://react-leaflet.js.org/)_

<br>

### Abstract User Story

**Moderator** (initial bistro creater OR assigned afterwards by one)

- manage members, positions, and overall tip information

**Member**

- view modify their own information - hours

</br>

## Features

---

### general auth & navigation

- [x] OAuth2.0 login
- [x] basic routes/pages
- [x] redirect
- [x] bistro invite link, join bistro request flow

## Pages

### - [x] /bistro

- [x] OSM search
- [x] integrate map
  - [x] map marker
  - [x] auto zoom on found places
- [] make UI more pleasing (combine create namefield & search)

### - [] /bistro/[bistroId]/Home

- [x] positions
  - [x] create & delete
  - [x] view
  - [x] assign/remove user
  - [] update
- []

### - [] /bistro/[bistroId]/pay

- [ ] tipForm CRUD
  - [ ] add variables
  - [ ] tipForm equation keyboard
- [ ] Tip

- [ ] Menu
