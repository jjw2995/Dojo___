import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import L from "leaflet";

const RES_RES = [
  {
    place_id: 15432079,
    licence:
      "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
    osm_type: "node",
    osm_id: 1724637522,
    boundingbox: ["49.2229563", "49.2230563", "-122.933013", "-122.932913"],
    lat: "49.2230063",
    lon: "-122.932963",
    display_name:
      "Baba Sweets & Restaurant, Graham Avenue, Eastburn, Burnaby, Metro Vancouver Regional District, British Columbia, V3N 3M3, Canada",
    place_rank: 30,
    category: "amenity",
    type: "restaurant",
    importance: 0.10010000000000001,
    icon: "https://nominatim.openstreetmap.org/ui/mapicons/food_restaurant.p.20.png",
    address: {
      amenity: "Baba Sweets & Restaurant",
      road: "Graham Avenue",
      neighbourhood: "Eastburn",
      city: "Burnaby",
      county: "Metro Vancouver Regional District",
      state: "British Columbia",
      "ISO3166-2-lvl4": "CA-BC",
      postcode: "V3N 3M3",
      country: "Canada",
      country_code: "ca",
    },
    extratags: {
      cuisine: "indian",
    },
    namedetails: {
      name: "Baba Sweets & Restaurant",
    },
  },
  {
    place_id: 58197275,
    licence:
      "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
    osm_type: "node",
    osm_id: 5304476421,
    boundingbox: ["49.1919091", "49.1920091", "-122.798699", "-122.798599"],
    lat: "49.1919591",
    lon: "-122.798649",
    display_name:
      "Fresh Restaurant & Lounge, 15269, 104 Avenue, Guildford, Surrey, Metro Vancouver Regional District, British Columbia, V3R 6Y8, Canada",
    place_rank: 30,
    category: "amenity",
    type: "restaurant",
    importance: 0.10010000000000001,
    icon: "https://nominatim.openstreetmap.org/ui/mapicons/food_restaurant.p.20.png",
    address: {
      amenity: "Fresh Restaurant & Lounge",
      house_number: "15269",
      road: "104 Avenue",
      suburb: "Guildford",
      city: "Surrey",
      county: "Metro Vancouver Regional District",
      state: "British Columbia",
      "ISO3166-2-lvl4": "CA-BC",
      postcode: "V3R 6Y8",
      country: "Canada",
      country_code: "ca",
    },
    extratags: {
      level: "0",
      phone: "+1-604-587-6127",
      indoor: "yes",
      cuisine: "regional",
      website: "http://www.eatatfresh.ca",
    },
    namedetails: {
      name: "Fresh Restaurant & Lounge",
    },
  },
  {
    place_id: 59552597,
    licence:
      "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
    osm_type: "node",
    osm_id: 5524760947,
    boundingbox: ["49.1989889", "49.1990889", "-122.8164658", "-122.8163658"],
    lat: "49.1990389",
    lon: "-122.8164158",
    display_name:
      "Sarpanch Sweets & Restaurant, 14645, 108 Avenue, Guildford, Surrey, Metro Vancouver Regional District, British Columbia, V3R 1V8, Canada",
    place_rank: 30,
    category: "amenity",
    type: "restaurant",
    importance: 0.10010000000000001,
    icon: "https://nominatim.openstreetmap.org/ui/mapicons/food_restaurant.p.20.png",
    address: {
      amenity: "Sarpanch Sweets & Restaurant",
      house_number: "14645",
      road: "108 Avenue",
      suburb: "Guildford",
      city: "Surrey",
      county: "Metro Vancouver Regional District",
      state: "British Columbia",
      "ISO3166-2-lvl4": "CA-BC",
      postcode: "V3R 1V8",
      country: "Canada",
      country_code: "ca",
    },
    extratags: {
      phone: "+1-604-582-6706",
      cuisine: "indian;dessert",
      website: "https://www.facebook.com/sarpanchsweets/",
      opening_hours: "Su-Sa 10:00-21:00",
    },
    namedetails: {
      name: "Sarpanch Sweets & Restaurant",
    },
  },
  {
    place_id: 345385016,
    licence:
      "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
    osm_type: "node",
    osm_id: 10094756917,
    boundingbox: ["49.1338708", "49.1339708", "-122.8556192", "-122.8555192"],
    lat: "49.1339208",
    lon: "-122.8555692",
    display_name:
      "Anand Pizza Sweets Restaurant, 72 Avenue, Newton, Surrey, Metro Vancouver Regional District, British Columbia, V3W 5A7, Canada",
    place_rank: 30,
    category: "amenity",
    type: "restaurant",
    importance: 0.10010000000000001,
    icon: "https://nominatim.openstreetmap.org/ui/mapicons/food_restaurant.p.20.png",
    address: {
      amenity: "Anand Pizza Sweets Restaurant",
      road: "72 Avenue",
      suburb: "Newton",
      city: "Surrey",
      county: "Metro Vancouver Regional District",
      state: "British Columbia",
      "ISO3166-2-lvl4": "CA-BC",
      postcode: "V3W 5A7",
      country: "Canada",
      country_code: "ca",
    },
    extratags: {
      cuisine: "pizza",
      check_date: "2022-10-11",
    },
    namedetails: {
      name: "Anand Pizza Sweets Restaurant",
    },
  },
  {
    place_id: 143399176,
    licence:
      "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
    osm_type: "way",
    osm_id: 161538117,
    boundingbox: ["49.1777762", "49.177861", "-122.8453282", "-122.8450053"],
    lat: "49.177818599999995",
    lon: "-122.84516675",
    display_name:
      "China Village Restaurant, King George Boulevard, City Centre, Surrey, Metro Vancouver Regional District, British Columbia, V3V 0E4, Canada",
    place_rank: 30,
    category: "amenity",
    type: "restaurant",
    importance: 0.10010000000000001,
    icon: "https://nominatim.openstreetmap.org/ui/mapicons/food_restaurant.p.20.png",
    address: {
      amenity: "China Village Restaurant",
      road: "King George Boulevard",
      city_district: "City Centre",
      city: "Surrey",
      county: "Metro Vancouver Regional District",
      state: "British Columbia",
      "ISO3166-2-lvl4": "CA-BC",
      postcode: "V3V 0E4",
      country: "Canada",
      country_code: "ca",
    },
    extratags: {
      phone: "+1-604-581-1933",
      cuisine: "chinese",
    },
    namedetails: {
      name: "China Village Restaurant",
    },
  },
  {
    place_id: 142792257,
    licence:
      "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
    osm_type: "way",
    osm_id: 159935861,
    boundingbox: ["49.2083971", "49.2085838", "-122.9142541", "-122.9139633"],
    lat: "49.20849045",
    lon: "-122.9141087",
    display_name:
      "The Old Bavaria Haus Restaurant, Lancaster Street, Queens Park, New Westminster, Metro Vancouver Regional District, British Columbia, V3L 0C9, Canada",
    place_rank: 30,
    category: "amenity",
    type: "restaurant",
    importance: 0.10010000000000001,
    icon: "https://nominatim.openstreetmap.org/ui/mapicons/food_restaurant.p.20.png",
    address: {
      amenity: "The Old Bavaria Haus Restaurant",
      road: "Lancaster Street",
      neighbourhood: "Queens Park",
      city_district: "Queens Park",
      city: "New Westminster",
      county: "Metro Vancouver Regional District",
      state: "British Columbia",
      "ISO3166-2-lvl4": "CA-BC",
      postcode: "V3L 0C9",
      country: "Canada",
      country_code: "ca",
    },
    extratags: {
      cuisine: "german",
      "building:levels": "3",
    },
    namedetails: {
      name: "The Old Bavaria Haus Restaurant",
    },
  },
  {
    place_id: 81183429,
    licence:
      "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
    osm_type: "node",
    osm_id: 8095772084,
    boundingbox: ["49.2491707", "49.2492707", "-122.8586333", "-122.8585333"],
    lat: "49.2492207",
    lon: "-122.8585833",
    display_name:
      "Ethno Restaurant Vayat, 1147, Austin Avenue, Austin Heights, Coquitlam, Metro Vancouver Regional District, British Columbia, V3K 0A0, Canada",
    place_rank: 30,
    category: "amenity",
    type: "restaurant",
    importance: 0.10010000000000001,
    icon: "https://nominatim.openstreetmap.org/ui/mapicons/food_restaurant.p.20.png",
    address: {
      amenity: "Ethno Restaurant Vayat",
      house_number: "1147",
      road: "Austin Avenue",
      suburb: "Austin Heights",
      city: "Coquitlam",
      county: "Metro Vancouver Regional District",
      state: "British Columbia",
      "ISO3166-2-lvl4": "CA-BC",
      postcode: "V3K 0A0",
      country: "Canada",
      country_code: "ca",
    },
    extratags: {},
    namedetails: {
      name: "Ethno Restaurant Vayat",
    },
  },
  {
    place_id: 81617477,
    licence:
      "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
    osm_type: "node",
    osm_id: 8095772087,
    boundingbox: ["49.2486768", "49.2487768", "-122.8601988", "-122.8600988"],
    lat: "49.2487268",
    lon: "-122.8601488",
    display_name:
      "South Castle Korean Restaurant, 1126, Austin Avenue, Austin Heights, Coquitlam, Metro Vancouver Regional District, British Columbia, V3K 0A0, Canada",
    place_rank: 30,
    category: "amenity",
    type: "restaurant",
    importance: 0.10010000000000001,
    icon: "https://nominatim.openstreetmap.org/ui/mapicons/food_restaurant.p.20.png",
    address: {
      amenity: "South Castle Korean Restaurant",
      house_number: "1126",
      road: "Austin Avenue",
      suburb: "Austin Heights",
      city: "Coquitlam",
      county: "Metro Vancouver Regional District",
      state: "British Columbia",
      "ISO3166-2-lvl4": "CA-BC",
      postcode: "V3K 0A0",
      country: "Canada",
      country_code: "ca",
    },
    extratags: {},
    namedetails: {
      name: "South Castle Korean Restaurant",
    },
  },
  {
    place_id: 94474589,
    licence:
      "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
    osm_type: "node",
    osm_id: 9233982289,
    boundingbox: ["49.1612108", "49.1613108", "-122.8922819", "-122.8921819"],
    lat: "49.1612608",
    lon: "-122.8922319",
    display_name:
      "Viti Curry Restaurant, Nordel Way, Kennedy, North Delta, Delta, Metro Vancouver Regional District, British Columbia, V3W 1P6, Canada",
    place_rank: 30,
    category: "amenity",
    type: "restaurant",
    importance: 0.10010000000000001,
    icon: "https://nominatim.openstreetmap.org/ui/mapicons/food_restaurant.p.20.png",
    address: {
      amenity: "Viti Curry Restaurant",
      road: "Nordel Way",
      suburb: "Kennedy",
      city_district: "North Delta",
      city: "Delta",
      county: "Metro Vancouver Regional District",
      state: "British Columbia",
      "ISO3166-2-lvl4": "CA-BC",
      postcode: "V3W 1P6",
      country: "Canada",
      country_code: "ca",
    },
    extratags: {
      cuisine: "indian",
    },
    namedetails: {
      name: "Viti Curry Restaurant",
    },
  },
  {
    place_id: 76800342,
    licence:
      "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
    osm_type: "node",
    osm_id: 7295668027,
    boundingbox: ["49.1528531", "49.1529531", "-122.8909115", "-122.8908115"],
    lat: "49.1529031",
    lon: "-122.8908615",
    display_name:
      "New Ruby Restaurant, 8223, 120 Street-Scott Road, Kennedy, North Delta, Delta, Metro Vancouver Regional District, British Columbia, V4C 6R1, Canada",
    place_rank: 30,
    category: "amenity",
    type: "restaurant",
    importance: 0.10010000000000001,
    icon: "https://nominatim.openstreetmap.org/ui/mapicons/food_restaurant.p.20.png",
    address: {
      amenity: "New Ruby Restaurant",
      house_number: "8223",
      road: "120 Street-Scott Road",
      suburb: "Kennedy",
      city_district: "North Delta",
      city: "Delta",
      county: "Metro Vancouver Regional District",
      state: "British Columbia",
      "ISO3166-2-lvl4": "CA-BC",
      postcode: "V4C 6R1",
      country: "Canada",
      country_code: "ca",
    },
    extratags: {
      cuisine: "chinese",
    },
    namedetails: {
      name: "New Ruby Restaurant",
    },
  },
  {
    place_id: 42988499,
    licence:
      "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
    osm_type: "node",
    osm_id: 3587110497,
    boundingbox: ["49.16935", "49.16945", "-122.914958", "-122.914858"],
    lat: "49.1694",
    lon: "-122.914908",
    display_name:
      "Greek Fellas Restaurant, 11008, River Road, Annieville, North Delta, Delta, Metro Vancouver Regional District, British Columbia, V4C 2S2, Canada",
    place_rank: 30,
    category: "amenity",
    type: "restaurant",
    importance: 0.10010000000000001,
    icon: "https://nominatim.openstreetmap.org/ui/mapicons/food_restaurant.p.20.png",
    address: {
      amenity: "Greek Fellas Restaurant",
      house_number: "11008",
      road: "River Road",
      quarter: "Annieville",
      city_district: "North Delta",
      city: "Delta",
      county: "Metro Vancouver Regional District",
      state: "British Columbia",
      "ISO3166-2-lvl4": "CA-BC",
      postcode: "V4C 2S2",
      country: "Canada",
      country_code: "ca",
    },
    extratags: {
      phone: "+1-604-584-2272",
      cuisine: "greek;seafood",
      website: "https://www.greekfellas.ca",
      opening_hours: "Sa-Su 16:00-22:00, Su-Th 16:00-21:00",
      "opening_hours:covid19": "Mo off",
    },
    namedetails: {
      name: "Greek Fellas Restaurant",
    },
  },
  {
    place_id: 15418941,
    licence:
      "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
    osm_type: "node",
    osm_id: 1704274548,
    boundingbox: ["49.2228575", "49.2229575", "-122.9815914", "-122.9814914"],
    lat: "49.2229075",
    lon: "-122.9815414",
    display_name:
      "Joyful Seafood Restaurant, 5665, Kingsway, Metrotown, Burnaby, Metro Vancouver Regional District, British Columbia, V5H 2G4, Canada",
    place_rank: 30,
    category: "amenity",
    type: "restaurant",
    importance: 0.10000999999999996,
    icon: "https://nominatim.openstreetmap.org/ui/mapicons/food_restaurant.p.20.png",
    address: {
      amenity: "Joyful Seafood Restaurant",
      house_number: "5665",
      road: "Kingsway",
      suburb: "Metrotown",
      city: "Burnaby",
      county: "Metro Vancouver Regional District",
      state: "British Columbia",
      "ISO3166-2-lvl4": "CA-BC",
      postcode: "V5H 2G4",
      country: "Canada",
      country_code: "ca",
    },
    extratags: {
      phone: "+1-604-436-2986",
      cuisine: "chinese",
      smoking: "no",
      indoor_seating: "yes",
      outdoor_seating: "no",
    },
    namedetails: {
      name: "Joyful Seafood Restaurant",
    },
  },
  {
    place_id: 60030809,
    licence:
      "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
    osm_type: "node",
    osm_id: 5570346975,
    boundingbox: ["49.2272295", "49.2273295", "-122.994574", "-122.994474"],
    lat: "49.2272795",
    lon: "-122.994524",
    display_name:
      "Morak Korean Restaurant, 6285, Nelson Avenue, Metrotown, Burnaby, Metro Vancouver Regional District, British Columbia, V5H 4T6, Canada",
    place_rank: 30,
    category: "amenity",
    type: "restaurant",
    importance: 0.10000999999999996,
    icon: "https://nominatim.openstreetmap.org/ui/mapicons/food_restaurant.p.20.png",
    address: {
      amenity: "Morak Korean Restaurant",
      house_number: "6285",
      road: "Nelson Avenue",
      suburb: "Metrotown",
      city: "Burnaby",
      county: "Metro Vancouver Regional District",
      state: "British Columbia",
      "ISO3166-2-lvl4": "CA-BC",
      postcode: "V5H 4T6",
      country: "Canada",
      country_code: "ca",
    },
    extratags: {
      phone: "+1-604-437-8839",
      website: "https://www.morakkoreanfusion.com/",
    },
    namedetails: {
      name: "Morak Korean Restaurant",
    },
  },
  {
    place_id: 50451403,
    licence:
      "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
    osm_type: "node",
    osm_id: 4444715674,
    boundingbox: ["49.2009636", "49.2010636", "-122.9125769", "-122.9124769"],
    lat: "49.2010136",
    lon: "-122.9125269",
    display_name:
      "Hub Restaurant New West, 800, Carnarvon Street, Downtown, New Westminster, Metro Vancouver Regional District, British Columbia, V3M 1E6, Canada",
    place_rank: 30,
    category: "amenity",
    type: "restaurant",
    importance: 0.10000999999999996,
    icon: "https://nominatim.openstreetmap.org/ui/mapicons/food_restaurant.p.20.png",
    address: {
      amenity: "Hub Restaurant New West",
      house_number: "800",
      road: "Carnarvon Street",
      neighbourhood: "Downtown",
      city_district: "Downtown",
      city: "New Westminster",
      county: "Metro Vancouver Regional District",
      state: "British Columbia",
      "ISO3166-2-lvl4": "CA-BC",
      postcode: "V3M 1E6",
      country: "Canada",
      country_code: "ca",
    },
    extratags: {
      email: "info@hubrestaurantgroup.ca",
      level: "2",
      phone: "+1-604-544-0401",
      cuisine: "american",
      smoking: "no",
      website: "https://hubrestaurant.ca/",
      indoor_seating: "yes",
      outdoor_seating: "no",
    },
    namedetails: {
      name: "Hub Restaurant New West",
    },
  },
  {
    place_id: 43370718,
    licence:
      "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
    osm_type: "node",
    osm_id: 3552756993,
    boundingbox: ["49.249376", "49.249476", "-122.8924471", "-122.8923471"],
    lat: "49.249426",
    lon: "-122.8923971",
    display_name:
      "Sushi California, 501, North Road, Sullivan Heights, Coquitlam, Metro Vancouver Regional District, British Columbia, V3J 1N7, Canada",
    place_rank: 30,
    category: "amenity",
    type: "restaurant",
    importance: 0.0001,
    icon: "https://nominatim.openstreetmap.org/ui/mapicons/food_restaurant.p.20.png",
    address: {
      amenity: "Sushi California",
      house_number: "501",
      road: "North Road",
      neighbourhood: "Sullivan Heights",
      city: "Coquitlam",
      county: "Metro Vancouver Regional District",
      state: "British Columbia",
      "ISO3166-2-lvl4": "CA-BC",
      postcode: "V3J 1N7",
      country: "Canada",
      country_code: "ca",
    },
    extratags: {
      phone: "+1-604-931-8284",
      cuisine: "sushi",
      delivery: "no",
      takeaway: "yes",
    },
    namedetails: {
      name: "Sushi California",
    },
  },
  {
    place_id: 42023385,
    licence:
      "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
    osm_type: "node",
    osm_id: 3400342446,
    boundingbox: ["49.2456748", "49.2457748", "-122.8934845", "-122.8933845"],
    lat: "49.2457248",
    lon: "-122.8934345",
    display_name:
      "Yan's Garden, 9938, Lougheed Highway, Burnaby, Metro Vancouver Regional District, British Columbia, V3J 1N3, Canada",
    place_rank: 30,
    category: "amenity",
    type: "restaurant",
    importance: 0.0001,
    icon: "https://nominatim.openstreetmap.org/ui/mapicons/food_restaurant.p.20.png",
    address: {
      amenity: "Yan's Garden",
      house_number: "9938",
      road: "Lougheed Highway",
      city: "Burnaby",
      county: "Metro Vancouver Regional District",
      state: "British Columbia",
      "ISO3166-2-lvl4": "CA-BC",
      postcode: "V3J 1N3",
      country: "Canada",
      country_code: "ca",
    },
    extratags: {
      level: "1",
      cuisine: "chinese",
      website: "https://www.yansgarden.ca/",
    },
    namedetails: {
      name: "Yan's Garden",
    },
  },
  {
    place_id: 68063937,
    licence:
      "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
    osm_type: "node",
    osm_id: 6391292708,
    boundingbox: ["49.2542636", "49.2543636", "-122.9183123", "-122.9182123"],
    lat: "49.2543136",
    lon: "-122.9182623",
    display_name:
      "Foodies on Board, 3290, Production Way, Burnaby, Metro Vancouver Regional District, British Columbia, V5A 4R4, Canada",
    place_rank: 30,
    category: "amenity",
    type: "restaurant",
    importance: 0.0001,
    icon: "https://nominatim.openstreetmap.org/ui/mapicons/food_restaurant.p.20.png",
    address: {
      amenity: "Foodies on Board",
      house_number: "3290",
      road: "Production Way",
      city: "Burnaby",
      county: "Metro Vancouver Regional District",
      state: "British Columbia",
      "ISO3166-2-lvl4": "CA-BC",
      postcode: "V5A 4R4",
      country: "Canada",
      country_code: "ca",
    },
    extratags: {
      website: "https://www.foodiesonboard.com/",
      opening_hours: "Mo-Fr 08:00-18:00",
      outdoor_seating: "no",
    },
    namedetails: {
      name: "Foodies on Board",
    },
  },
  {
    place_id: 59392521,
    licence:
      "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
    osm_type: "node",
    osm_id: 5487585713,
    boundingbox: ["49.1995933", "49.1996933", "-122.8116081", "-122.8115081"],
    lat: "49.1996433",
    lon: "-122.8115581",
    display_name:
      "Sushi Zen, 14839, 108 Avenue, Birdland, Guildford, Surrey, Metro Vancouver Regional District, British Columbia, V3R 1W2, Canada",
    place_rank: 30,
    category: "amenity",
    type: "restaurant",
    importance: 0.0001,
    icon: "https://nominatim.openstreetmap.org/ui/mapicons/food_restaurant.p.20.png",
    address: {
      amenity: "Sushi Zen",
      house_number: "14839",
      road: "108 Avenue",
      neighbourhood: "Birdland",
      suburb: "Guildford",
      city: "Surrey",
      county: "Metro Vancouver Regional District",
      state: "British Columbia",
      "ISO3166-2-lvl4": "CA-BC",
      postcode: "V3R 1W2",
      country: "Canada",
      country_code: "ca",
    },
    extratags: {},
    namedetails: {
      name: "Sushi Zen",
    },
  },
  {
    place_id: 57842043,
    licence:
      "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
    osm_type: "node",
    osm_id: 5313973547,
    boundingbox: ["49.1991645", "49.1992645", "-122.7773615", "-122.7772615"],
    lat: "49.1992145",
    lon: "-122.7773115",
    display_name:
      "DDDN Pan Pizza, 16033, 108 Avenue, Guildford, Surrey, Metro Vancouver Regional District, British Columbia, V4N 1P2, Canada",
    place_rank: 30,
    category: "amenity",
    type: "restaurant",
    importance: 0.0001,
    icon: "https://nominatim.openstreetmap.org/ui/mapicons/food_restaurant.p.20.png",
    address: {
      amenity: "DDDN Pan Pizza",
      house_number: "16033",
      road: "108 Avenue",
      suburb: "Guildford",
      city: "Surrey",
      county: "Metro Vancouver Regional District",
      state: "British Columbia",
      "ISO3166-2-lvl4": "CA-BC",
      postcode: "V4N 1P2",
      country: "Canada",
      country_code: "ca",
    },
    extratags: {
      phone: "+1-778-395-7078",
      cuisine: "pizza",
      smoking: "no",
      opening_hours: "Mo-Sa 11:00-19:00",
    },
    namedetails: {
      name: "DDDN Pan Pizza",
    },
  },
  {
    place_id: 59222383,
    licence:
      "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
    osm_type: "node",
    osm_id: 5506259225,
    boundingbox: ["49.1980903", "49.1981903", "-122.8421571", "-122.8420571"],
    lat: "49.1981403",
    lon: "-122.8421071",
    display_name:
      "Manis Pan-Asian Eatery, 10768, Whalley Boulevard, City Centre, Surrey, Metro Vancouver Regional District, British Columbia, V3T 0G1, Canada",
    place_rank: 30,
    category: "amenity",
    type: "restaurant",
    importance: 0.0001,
    icon: "https://nominatim.openstreetmap.org/ui/mapicons/food_restaurant.p.20.png",
    address: {
      amenity: "Manis Pan-Asian Eatery",
      house_number: "10768",
      road: "Whalley Boulevard",
      city_district: "City Centre",
      city: "Surrey",
      county: "Metro Vancouver Regional District",
      state: "British Columbia",
      "ISO3166-2-lvl4": "CA-BC",
      postcode: "V3T 0G1",
      country: "Canada",
      country_code: "ca",
    },
    extratags: {
      level: "0",
      cuisine: "asian",
      website: "https://www.manisrestaurant.com/",
      opening_hours:
        "Mo,Tu,Th 11:30-15:00,16:30-20:00; We off; Fr 11:30-15:00,16:30-21:00; Sa 12:00-21:00; Su 11:30-20:00",
    },
    namedetails: {
      name: "Manis Pan-Asian Eatery",
      alt_name: "Manis Restaurant",
    },
  },
  {
    place_id: 52977208,
    licence:
      "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
    osm_type: "node",
    osm_id: 4744317242,
    boundingbox: ["49.1854701", "49.1855701", "-122.8476001", "-122.8475001"],
    lat: "49.1855201",
    lon: "-122.8475501",
    display_name:
      "Saison, 10153, King George Boulevard, City Centre, Surrey, Metro Vancouver Regional District, British Columbia, V3T 2W4, Canada",
    place_rank: 30,
    category: "amenity",
    type: "restaurant",
    importance: 0.0001,
    icon: "https://nominatim.openstreetmap.org/ui/mapicons/food_restaurant.p.20.png",
    address: {
      amenity: "Saison",
      house_number: "10153",
      road: "King George Boulevard",
      city_district: "City Centre",
      city: "Surrey",
      county: "Metro Vancouver Regional District",
      state: "British Columbia",
      "ISO3166-2-lvl4": "CA-BC",
      postcode: "V3T 2W4",
      country: "Canada",
      country_code: "ca",
    },
    extratags: {},
    namedetails: {
      name: "Saison",
      "name:en": "Saison",
    },
  },
  {
    place_id: 52885681,
    licence:
      "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
    osm_type: "node",
    osm_id: 4705744404,
    boundingbox: ["49.1582591", "49.1583591", "-122.8899668", "-122.8898668"],
    lat: "49.1583091",
    lon: "-122.8899168",
    display_name:
      "Mahek Chaat House, 8556, 120 Street-Scott Road, Newton, Surrey, Metro Vancouver Regional District, British Columbia, V4C 6R5, Canada",
    place_rank: 30,
    category: "amenity",
    type: "restaurant",
    importance: 0.0001,
    icon: "https://nominatim.openstreetmap.org/ui/mapicons/food_restaurant.p.20.png",
    address: {
      amenity: "Mahek Chaat House",
      house_number: "8556",
      road: "120 Street-Scott Road",
      suburb: "Newton",
      city: "Surrey",
      county: "Metro Vancouver Regional District",
      state: "British Columbia",
      "ISO3166-2-lvl4": "CA-BC",
      postcode: "V4C 6R5",
      country: "Canada",
      country_code: "ca",
    },
    extratags: {
      phone: "+1-604-597-3835",
      cuisine: "indian",
      website: "http://mahekchaat.ca/",
      opening_hours: "We-Mo 11:30-21:00",
    },
    namedetails: {
      name: "Mahek Chaat House",
    },
  },
  {
    place_id: 52891392,
    licence:
      "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
    osm_type: "node",
    osm_id: 4703005692,
    boundingbox: ["49.1876019", "49.1877019", "-122.8447833", "-122.8446833"],
    lat: "49.1876519",
    lon: "-122.8447333",
    display_name:
      "All About Pho, 10190, King George Boulevard, City Centre, Surrey, Metro Vancouver Regional District, British Columbia, V3T 2W4, Canada",
    place_rank: 30,
    category: "amenity",
    type: "restaurant",
    importance: 0.0001,
    icon: "https://nominatim.openstreetmap.org/ui/mapicons/food_restaurant.p.20.png",
    address: {
      amenity: "All About Pho",
      house_number: "10190",
      road: "King George Boulevard",
      city_district: "City Centre",
      city: "Surrey",
      county: "Metro Vancouver Regional District",
      state: "British Columbia",
      "ISO3166-2-lvl4": "CA-BC",
      postcode: "V3T 2W4",
      country: "Canada",
      country_code: "ca",
    },
    extratags: {
      phone: "+1-604-498-0222",
      cuisine: "vietnamese",
      website: "https://www.allaboutpho.ca/",
      opening_hours: "Su-Th 10:00-23:00; Fr-Sa 10:00-00:00",
    },
    namedetails: {
      name: "All About Pho",
      "name:en": "All About Pho",
    },
  },
  {
    place_id: 53324703,
    licence:
      "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
    osm_type: "node",
    osm_id: 4744317226,
    boundingbox: ["49.1860686", "49.1861686", "-122.8474882", "-122.8473882"],
    lat: "49.1861186",
    lon: "-122.8474382",
    display_name:
      "Ricky's, 10153, King George Boulevard, City Centre, Surrey, Metro Vancouver Regional District, British Columbia, V3T 2W4, Canada",
    place_rank: 30,
    category: "amenity",
    type: "restaurant",
    importance: 0.0001,
    icon: "https://nominatim.openstreetmap.org/ui/mapicons/food_restaurant.p.20.png",
    address: {
      amenity: "Ricky's",
      house_number: "10153",
      road: "King George Boulevard",
      city_district: "City Centre",
      city: "Surrey",
      county: "Metro Vancouver Regional District",
      state: "British Columbia",
      "ISO3166-2-lvl4": "CA-BC",
      postcode: "V3T 2W4",
      country: "Canada",
      country_code: "ca",
    },
    extratags: {},
    namedetails: {
      name: "Ricky's",
      "name:en": "Ricky's",
    },
  },
  {
    place_id: 143783525,
    licence:
      "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
    osm_type: "way",
    osm_id: 161525285,
    boundingbox: ["49.172714", "49.1728841", "-122.8899341", "-122.8897885"],
    lat: "49.1728157",
    lon: "-122.889861316098",
    display_name:
      "93A Avenue, Whalley, North Delta, Surrey, Metro Vancouver Regional District, British Columbia, V4C 7V4, Canada",
    place_rank: 30,
    category: "amenity",
    type: "restaurant",
    importance: 0.0001,
    icon: "https://nominatim.openstreetmap.org/ui/mapicons/food_restaurant.p.20.png",
    address: {
      road: "93A Avenue",
      suburb: "Whalley",
      city_district: "North Delta",
      city: "Surrey",
      county: "Metro Vancouver Regional District",
      state: "British Columbia",
      "ISO3166-2-lvl4": "CA-BC",
      postcode: "V4C 7V4",
      country: "Canada",
      country_code: "ca",
    },
    extratags: {},
    namedetails: {},
  },
  {
    place_id: 94715529,
    licence:
      "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
    osm_type: "node",
    osm_id: 9223435628,
    boundingbox: ["49.1845119", "49.1846119", "-122.844648", "-122.844548"],
    lat: "49.1845619",
    lon: "-122.844598",
    display_name:
      "Izumo Sushi, 13631, 100 Avenue, City Centre, Surrey, Metro Vancouver Regional District, British Columbia, V3T 0H2, Canada",
    place_rank: 30,
    category: "amenity",
    type: "restaurant",
    importance: 0.0001,
    icon: "https://nominatim.openstreetmap.org/ui/mapicons/food_restaurant.p.20.png",
    address: {
      amenity: "Izumo Sushi",
      house_number: "13631",
      road: "100 Avenue",
      city_district: "City Centre",
      city: "Surrey",
      county: "Metro Vancouver Regional District",
      state: "British Columbia",
      "ISO3166-2-lvl4": "CA-BC",
      postcode: "V3T 0H2",
      country: "Canada",
      country_code: "ca",
    },
    extratags: {
      cuisine: "japanese",
    },
    namedetails: {
      name: "Izumo Sushi",
    },
  },
  {
    place_id: 181571437,
    licence:
      "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
    osm_type: "way",
    osm_id: 316397818,
    boundingbox: ["49.1992817", "49.1994642", "-122.8456218", "-122.8453418"],
    lat: "49.19937295",
    lon: "-122.8454818168182",
    display_name:
      "Di Reggae Cafe, 13593, King George Boulevard, City Centre, Surrey, Metro Vancouver Regional District, British Columbia, V3T 2Y0, Canada",
    place_rank: 30,
    category: "amenity",
    type: "restaurant",
    importance: 0.0001,
    icon: "https://nominatim.openstreetmap.org/ui/mapicons/food_restaurant.p.20.png",
    address: {
      amenity: "Di Reggae Cafe",
      house_number: "13593",
      road: "King George Boulevard",
      city_district: "City Centre",
      city: "Surrey",
      county: "Metro Vancouver Regional District",
      state: "British Columbia",
      "ISO3166-2-lvl4": "CA-BC",
      postcode: "V3T 2Y0",
      country: "Canada",
      country_code: "ca",
    },
    extratags: {
      cuisine: "caribbean",
      website: "http://direggaecafe.ca",
      "surrey:date": "19860312",
      "surrey:addrid": "85420",
    },
    namedetails: {
      name: "Di Reggae Cafe",
    },
  },
  {
    place_id: 76458716,
    licence:
      "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
    osm_type: "node",
    osm_id: 7272793342,
    boundingbox: ["49.1947006", "49.1948006", "-122.844893", "-122.844793"],
    lat: "49.1947506",
    lon: "-122.844843",
    display_name:
      "Dell Lanes, 10576, King George Boulevard, City Centre, Surrey, Metro Vancouver Regional District, British Columbia, V3T 2Y0, Canada",
    place_rank: 30,
    category: "amenity",
    type: "restaurant",
    importance: 0.0001,
    icon: "https://nominatim.openstreetmap.org/ui/mapicons/food_restaurant.p.20.png",
    address: {
      amenity: "Dell Lanes",
      house_number: "10576",
      road: "King George Boulevard",
      city_district: "City Centre",
      city: "Surrey",
      county: "Metro Vancouver Regional District",
      state: "British Columbia",
      "ISO3166-2-lvl4": "CA-BC",
      postcode: "V3T 2Y0",
      country: "Canada",
      country_code: "ca",
    },
    extratags: {
      phone: "+1-604-581-8230",
      website: "https://delllanes.ca",
    },
    namedetails: {
      name: "Dell Lanes",
    },
  },
  {
    place_id: 76956194,
    licence:
      "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
    osm_type: "node",
    osm_id: 7295668046,
    boundingbox: ["49.1756957", "49.1757957", "-122.8906825", "-122.8905825"],
    lat: "49.1757457",
    lon: "-122.8906325",
    display_name:
      "Pamir Diner Afghan Cuisine, 9535, Scott Road, Whalley, Delta, Metro Vancouver Regional District, British Columbia, V3V 0B5, Canada",
    place_rank: 30,
    category: "amenity",
    type: "restaurant",
    importance: 0.0001,
    icon: "https://nominatim.openstreetmap.org/ui/mapicons/food_restaurant.p.20.png",
    address: {
      amenity: "Pamir Diner Afghan Cuisine",
      house_number: "9535",
      road: "Scott Road",
      suburb: "Whalley",
      city: "Delta",
      county: "Metro Vancouver Regional District",
      state: "British Columbia",
      "ISO3166-2-lvl4": "CA-BC",
      postcode: "V3V 0B5",
      country: "Canada",
      country_code: "ca",
    },
    extratags: {},
    namedetails: {
      name: "Pamir Diner Afghan Cuisine",
    },
  },
  {
    place_id: 76771162,
    licence:
      "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
    osm_type: "node",
    osm_id: 7295668040,
    boundingbox: ["49.1585234", "49.1586234", "-122.8899354", "-122.8898354"],
    lat: "49.1585734",
    lon: "-122.8898854",
    display_name:
      "Miyagi Sushi, 8556, 120 Street-Scott Road, Newton, Surrey, Metro Vancouver Regional District, British Columbia, V4C 6R5, Canada",
    place_rank: 30,
    category: "amenity",
    type: "restaurant",
    importance: 0.0001,
    icon: "https://nominatim.openstreetmap.org/ui/mapicons/food_restaurant.p.20.png",
    address: {
      amenity: "Miyagi Sushi",
      house_number: "8556",
      road: "120 Street-Scott Road",
      suburb: "Newton",
      city: "Surrey",
      county: "Metro Vancouver Regional District",
      state: "British Columbia",
      "ISO3166-2-lvl4": "CA-BC",
      postcode: "V4C 6R5",
      country: "Canada",
      country_code: "ca",
    },
    extratags: {
      cuisine: "sushi",
    },
    namedetails: {
      name: "Miyagi Sushi",
    },
  },
  {
    place_id: 40870403,
    licence:
      "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
    osm_type: "node",
    osm_id: 3282652561,
    boundingbox: ["49.1916311", "49.1917311", "-122.8234493", "-122.8233493"],
    lat: "49.1916811",
    lon: "-122.8233993",
    display_name:
      "Phở Hòa, 14357, 104 Avenue, Whalley, Surrey, Metro Vancouver Regional District, British Columbia, V3T 1Y1, Canada",
    place_rank: 30,
    category: "amenity",
    type: "restaurant",
    importance: 0.0001,
    icon: "https://nominatim.openstreetmap.org/ui/mapicons/food_restaurant.p.20.png",
    address: {
      amenity: "Phở Hòa",
      house_number: "14357",
      road: "104 Avenue",
      suburb: "Whalley",
      city: "Surrey",
      county: "Metro Vancouver Regional District",
      state: "British Columbia",
      "ISO3166-2-lvl4": "CA-BC",
      postcode: "V3T 1Y1",
      country: "Canada",
      country_code: "ca",
    },
    extratags: {
      phone: "+1-604-581-3289",
      cuisine: "vietnamese;noodle",
      smoking: "no",
      website: "https://phohoa.com/",
      capacity: "50",
      opening_hours: "Su-Sa 10:00-23:30",
      "brand:wikidata": "Q55629932",
      "brand:wikipedia": "en:Phở Hòa",
    },
    namedetails: {
      name: "Phở Hòa",
      brand: "Phở Hòa",
      "name:vi": "Phở Hòa",
      alt_name: "Phở Hoà",
      "alt_name:en": "Pho Hoa",
      "alt_name:vi": "Phở Hoà",
    },
  },
  {
    place_id: 142962636,
    licence:
      "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
    osm_type: "way",
    osm_id: 161714459,
    boundingbox: ["49.1910716", "49.1912823", "-122.8366802", "-122.8364233"],
    lat: "49.19115455",
    lon: "-122.83655200965458",
    display_name:
      "13922, 104 Avenue, City Centre, Surrey, Metro Vancouver Regional District, British Columbia, V3T 4L5, Canada",
    place_rank: 30,
    category: "amenity",
    type: "restaurant",
    importance: 0.0001,
    icon: "https://nominatim.openstreetmap.org/ui/mapicons/food_restaurant.p.20.png",
    address: {
      house_number: "13922",
      road: "104 Avenue",
      city_district: "City Centre",
      city: "Surrey",
      county: "Metro Vancouver Regional District",
      state: "British Columbia",
      "ISO3166-2-lvl4": "CA-BC",
      postcode: "V3T 4L5",
      country: "Canada",
      country_code: "ca",
    },
    extratags: {
      cuisine: "korean",
      "surrey:date": "19850924",
      "surrey:addrid": "30052",
    },
    namedetails: {},
  },
  {
    place_id: 70430735,
    licence:
      "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
    osm_type: "node",
    osm_id: 6601537744,
    boundingbox: ["49.1763897", "49.1764897", "-122.8653151", "-122.8652151"],
    lat: "49.1764397",
    lon: "-122.8652651",
    display_name:
      "Mr Pickwick's Fish & Chips, 12884, 96 Avenue, Whalley, Surrey, Metro Vancouver Regional District, British Columbia, V3T 3M5, Canada",
    place_rank: 30,
    category: "amenity",
    type: "restaurant",
    importance: 0.0001,
    icon: "https://nominatim.openstreetmap.org/ui/mapicons/food_restaurant.p.20.png",
    address: {
      amenity: "Mr Pickwick's Fish & Chips",
      house_number: "12884",
      road: "96 Avenue",
      suburb: "Whalley",
      city: "Surrey",
      county: "Metro Vancouver Regional District",
      state: "British Columbia",
      "ISO3166-2-lvl4": "CA-BC",
      postcode: "V3T 3M5",
      country: "Canada",
      country_code: "ca",
    },
    extratags: {},
    namedetails: {
      name: "Mr Pickwick's Fish & Chips",
    },
  },
  {
    place_id: 54912380,
    licence:
      "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
    osm_type: "node",
    osm_id: 4828059021,
    boundingbox: ["49.1995395", "49.1996395", "-122.9125581", "-122.9124581"],
    lat: "49.1995895",
    lon: "-122.9125081",
    display_name:
      "The Boathouse, 900, Quayside Drive, Quayside, New Westminster, Metro Vancouver Regional District, British Columbia, V3M 6G1, Canada",
    place_rank: 30,
    category: "amenity",
    type: "restaurant",
    importance: 0.0001,
    icon: "https://nominatim.openstreetmap.org/ui/mapicons/food_restaurant.p.20.png",
    address: {
      amenity: "The Boathouse",
      house_number: "900",
      road: "Quayside Drive",
      neighbourhood: "Quayside",
      city_district: "Quayside",
      city: "New Westminster",
      county: "Metro Vancouver Regional District",
      state: "British Columbia",
      "ISO3166-2-lvl4": "CA-BC",
      postcode: "V3M 6G1",
      country: "Canada",
      country_code: "ca",
    },
    extratags: {
      cuisine: "seafood",
      website: "http://boathouserestaurant.ca",
    },
    namedetails: {
      name: "The Boathouse",
      brand: "The Boathouse",
      "name:en": "The Boathouse",
    },
  },
  {
    place_id: 95844219,
    licence:
      "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
    osm_type: "node",
    osm_id: 9173838766,
    boundingbox: ["49.2244123", "49.2245123", "-122.8921882", "-122.8920882"],
    lat: "49.2244623",
    lon: "-122.8921382",
    display_name:
      "Steve's Poké Bar, 237, Nelson's Crescent, Sapperton, McBride Sapperton, New Westminster, Metro Vancouver Regional District, British Columbia, V3L 0H4, Canada",
    place_rank: 30,
    category: "amenity",
    type: "restaurant",
    importance: 0.0001,
    icon: "https://nominatim.openstreetmap.org/ui/mapicons/food_restaurant.p.20.png",
    address: {
      amenity: "Steve's Poké Bar",
      house_number: "237",
      road: "Nelson's Crescent",
      neighbourhood: "Sapperton",
      city_district: "McBride Sapperton",
      city: "New Westminster",
      county: "Metro Vancouver Regional District",
      state: "British Columbia",
      "ISO3166-2-lvl4": "CA-BC",
      postcode: "V3L 0H4",
      country: "Canada",
      country_code: "ca",
    },
    extratags: {},
    namedetails: {
      name: "Steve's Poké Bar",
    },
  },
  {
    place_id: 94902826,
    licence:
      "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
    osm_type: "node",
    osm_id: 9173772702,
    boundingbox: ["49.2004992", "49.2005992", "-122.9141206", "-122.9140206"],
    lat: "49.2005492",
    lon: "-122.9140706",
    display_name:
      "Kushi Mura Izakaya, 800, Carnarvon Street, Downtown, New Westminster, Metro Vancouver Regional District, British Columbia, V3M 1C4, Canada",
    place_rank: 30,
    category: "amenity",
    type: "restaurant",
    importance: 0.0001,
    icon: "https://nominatim.openstreetmap.org/ui/mapicons/food_restaurant.p.20.png",
    address: {
      amenity: "Kushi Mura Izakaya",
      house_number: "800",
      road: "Carnarvon Street",
      neighbourhood: "Downtown",
      city_district: "Downtown",
      city: "New Westminster",
      county: "Metro Vancouver Regional District",
      state: "British Columbia",
      "ISO3166-2-lvl4": "CA-BC",
      postcode: "V3M 1C4",
      country: "Canada",
      country_code: "ca",
    },
    extratags: {},
    namedetails: {
      name: "Kushi Mura Izakaya",
    },
  },
  {
    place_id: 94862048,
    licence:
      "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
    osm_type: "node",
    osm_id: 9301329613,
    boundingbox: ["49.2141529", "49.2142529", "-122.8978513", "-122.8977513"],
    lat: "49.2142029",
    lon: "-122.8978013",
    display_name:
      "L'Onore Pizza, 28, East Royal Avenue, McBride Sapperton, New Westminster, Metro Vancouver Regional District, British Columbia, V3L 5P5, Canada",
    place_rank: 30,
    category: "amenity",
    type: "restaurant",
    importance: 0.0001,
    icon: "https://nominatim.openstreetmap.org/ui/mapicons/food_restaurant.p.20.png",
    address: {
      amenity: "L'Onore Pizza",
      house_number: "28",
      road: "East Royal Avenue",
      city_district: "McBride Sapperton",
      city: "New Westminster",
      county: "Metro Vancouver Regional District",
      state: "British Columbia",
      "ISO3166-2-lvl4": "CA-BC",
      postcode: "V3L 5P5",
      country: "Canada",
      country_code: "ca",
    },
    extratags: {
      cuisine: "pizza",
    },
    namedetails: {
      name: "L'Onore Pizza",
    },
  },
  {
    place_id: 30332323,
    licence:
      "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
    osm_type: "node",
    osm_id: 2811742298,
    boundingbox: ["49.2004412", "49.2005412", "-122.9178596", "-122.9177596"],
    lat: "49.2004912",
    lon: "-122.9178096",
    display_name:
      "DeDutch, 1035, Columbia Street, Downtown, New Westminster, Metro Vancouver Regional District, British Columbia, V3M 1B0, Canada",
    place_rank: 30,
    category: "amenity",
    type: "restaurant",
    importance: 0.0001,
    icon: "https://nominatim.openstreetmap.org/ui/mapicons/food_restaurant.p.20.png",
    address: {
      amenity: "DeDutch",
      house_number: "1035",
      road: "Columbia Street",
      neighbourhood: "Downtown",
      city_district: "Downtown",
      city: "New Westminster",
      county: "Metro Vancouver Regional District",
      state: "British Columbia",
      "ISO3166-2-lvl4": "CA-BC",
      postcode: "V3M 1B0",
      country: "Canada",
      country_code: "ca",
    },
    extratags: {
      cuisine: "breakfast",
    },
    namedetails: {
      name: "DeDutch",
    },
  },
  {
    place_id: 30458203,
    licence:
      "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
    osm_type: "node",
    osm_id: 2811742299,
    boundingbox: ["49.2004815", "49.2005815", "-122.9183151", "-122.9182151"],
    lat: "49.2005315",
    lon: "-122.9182651",
    display_name:
      "Boston Pizza, 1045, Columbia Street, Downtown, New Westminster, Metro Vancouver Regional District, British Columbia, V3M 1B0, Canada",
    place_rank: 30,
    category: "amenity",
    type: "restaurant",
    importance: 0.0001,
    icon: "https://nominatim.openstreetmap.org/ui/mapicons/food_restaurant.p.20.png",
    address: {
      amenity: "Boston Pizza",
      house_number: "1045",
      road: "Columbia Street",
      neighbourhood: "Downtown",
      city_district: "Downtown",
      city: "New Westminster",
      county: "Metro Vancouver Regional District",
      state: "British Columbia",
      "ISO3166-2-lvl4": "CA-BC",
      postcode: "V3M 1B0",
      country: "Canada",
      country_code: "ca",
    },
    extratags: {
      cuisine: "pizza",
      capacity: "150",
      "brand:wikidata": "Q894578",
      "brand:wikipedia": "en:Boston Pizza",
    },
    namedetails: {
      name: "Boston Pizza",
      brand: "Boston Pizza",
    },
  },
  {
    place_id: 162245963,
    licence:
      "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
    osm_type: "way",
    osm_id: 230620418,
    boundingbox: ["49.2318672", "49.2320105", "-122.8923164", "-122.8921213"],
    lat: "49.231910600000006",
    lon: "-122.89219555",
    display_name:
      "Bruncheria, 502, East Columbia Street, Massey Victory Heights, New Westminster, Metro Vancouver Regional District, British Columbia, V3L 1B1, Canada",
    place_rank: 30,
    category: "amenity",
    type: "restaurant",
    importance: 0.0001,
    icon: "https://nominatim.openstreetmap.org/ui/mapicons/food_restaurant.p.20.png",
    address: {
      amenity: "Bruncheria",
      house_number: "502",
      road: "East Columbia Street",
      city_district: "Massey Victory Heights",
      city: "New Westminster",
      county: "Metro Vancouver Regional District",
      state: "British Columbia",
      "ISO3166-2-lvl4": "CA-BC",
      postcode: "V3L 1B1",
      country: "Canada",
      country_code: "ca",
    },
    extratags: {
      phone: "+1-604-544-0018",
      website: "https://bruncheria.ca/",
      opening_hours: "Mo-Fr 08:00-15:00; Sa-Su 08:00-16:00",
    },
    namedetails: {
      name: "Bruncheria",
    },
  },
  {
    place_id: 40740575,
    licence:
      "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
    osm_type: "node",
    osm_id: 3237276361,
    boundingbox: ["49.21329", "49.21339", "-122.898748", "-122.898648"],
    lat: "49.21334",
    lon: "-122.898698",
    display_name:
      "Victoria Sushi, 15, East Royal Avenue, McBride Sapperton, New Westminster, Metro Vancouver Regional District, British Columbia, V3L 5P5, Canada",
    place_rank: 30,
    category: "amenity",
    type: "restaurant",
    importance: 0.0001,
    icon: "https://nominatim.openstreetmap.org/ui/mapicons/food_restaurant.p.20.png",
    address: {
      amenity: "Victoria Sushi",
      house_number: "15",
      road: "East Royal Avenue",
      city_district: "McBride Sapperton",
      city: "New Westminster",
      county: "Metro Vancouver Regional District",
      state: "British Columbia",
      "ISO3166-2-lvl4": "CA-BC",
      postcode: "V3L 5P5",
      country: "Canada",
      country_code: "ca",
    },
    extratags: {
      cuisine: "sushi",
      takeaway: "yes",
    },
    namedetails: {
      name: "Victoria Sushi",
    },
  },
  {
    place_id: 196540123,
    licence:
      "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
    osm_type: "way",
    osm_id: 391276983,
    boundingbox: ["49.2042028", "49.204414", "-122.9081971", "-122.907863"],
    lat: "49.20431715",
    lon: "-122.90805902674688",
    display_name:
      "Patsara, 528, Carnarvon Street, Downtown, New Westminster, Metro Vancouver Regional District, British Columbia, V3L 1C4, Canada",
    place_rank: 30,
    category: "amenity",
    type: "restaurant",
    importance: 0.0001,
    icon: "https://nominatim.openstreetmap.org/ui/mapicons/food_restaurant.p.20.png",
    address: {
      amenity: "Patsara",
      house_number: "528",
      road: "Carnarvon Street",
      neighbourhood: "Downtown",
      city_district: "Downtown",
      city: "New Westminster",
      county: "Metro Vancouver Regional District",
      state: "British Columbia",
      "ISO3166-2-lvl4": "CA-BC",
      postcode: "V3L 1C4",
      country: "Canada",
      country_code: "ca",
    },
    extratags: {
      email: "puvarinchong@gmail.com",
      phone: "+1-778-398-2777",
      cuisine: "thai",
      website: "https://patsara.ca/",
      opening_hours: "Tu-Su 16:30-21:00",
    },
    namedetails: {
      name: "Patsara",
    },
  },
  {
    place_id: 70799884,
    licence:
      "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
    osm_type: "node",
    osm_id: 6770865113,
    boundingbox: ["49.2010871", "49.2011871", "-122.9170653", "-122.9169653"],
    lat: "49.2011371",
    lon: "-122.9170153",
    display_name:
      "Hayashi Sushi, 78, Tenth Street, Downtown, New Westminster, Metro Vancouver Regional District, British Columbia, V3M 6H0, Canada",
    place_rank: 30,
    category: "amenity",
    type: "restaurant",
    importance: 0.0001,
    icon: "https://nominatim.openstreetmap.org/ui/mapicons/food_restaurant.p.20.png",
    address: {
      amenity: "Hayashi Sushi",
      house_number: "78",
      road: "Tenth Street",
      neighbourhood: "Downtown",
      city_district: "Downtown",
      city: "New Westminster",
      county: "Metro Vancouver Regional District",
      state: "British Columbia",
      "ISO3166-2-lvl4": "CA-BC",
      postcode: "V3M 6H0",
      country: "Canada",
      country_code: "ca",
    },
    extratags: {
      cuisine: "sushi",
      opening_hours: "Mo-Sa 11:30-21:00",
    },
    namedetails: {
      name: "Hayashi Sushi",
    },
  },
  {
    place_id: 60614695,
    licence:
      "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
    osm_type: "node",
    osm_id: 5599345245,
    boundingbox: ["49.2456799", "49.2457799", "-122.891451", "-122.891351"],
    lat: "49.2457299",
    lon: "-122.891401",
    display_name:
      "Insadong, Rochester Avenue, Cariboo, Coquitlam, Metro Vancouver Regional District, British Columbia, V3K 2V5, Canada",
    place_rank: 30,
    category: "amenity",
    type: "restaurant",
    importance: 0.0001,
    icon: "https://nominatim.openstreetmap.org/ui/mapicons/food_restaurant.p.20.png",
    address: {
      amenity: "Insadong",
      road: "Rochester Avenue",
      suburb: "Cariboo",
      city: "Coquitlam",
      county: "Metro Vancouver Regional District",
      state: "British Columbia",
      "ISO3166-2-lvl4": "CA-BC",
      postcode: "V3K 2V5",
      country: "Canada",
      country_code: "ca",
    },
    extratags: {
      cuisine: "korean",
      website: "http://insadongbbq.ca/",
      opening_hours: "Mo-Su 11:30-22:00",
    },
    namedetails: {
      name: "Insadong",
    },
  },
  {
    place_id: 56376629,
    licence:
      "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
    osm_type: "node",
    osm_id: 5059750741,
    boundingbox: ["49.2369189", "49.2370189", "-122.870483", "-122.870383"],
    lat: "49.2369689",
    lon: "-122.870433",
    display_name:
      "That Place 4 Pasta & Pizza, 932, Brunette Avenue, Maillardville, Coquitlam, Metro Vancouver Regional District, British Columbia, V3K 4L6, Canada",
    place_rank: 30,
    category: "amenity",
    type: "restaurant",
    importance: 0.0001,
    icon: "https://nominatim.openstreetmap.org/ui/mapicons/food_restaurant.p.20.png",
    address: {
      amenity: "That Place 4 Pasta & Pizza",
      house_number: "932",
      road: "Brunette Avenue",
      suburb: "Maillardville",
      city: "Coquitlam",
      county: "Metro Vancouver Regional District",
      state: "British Columbia",
      "ISO3166-2-lvl4": "CA-BC",
      postcode: "V3K 4L6",
      country: "Canada",
      country_code: "ca",
    },
    extratags: {
      phone: "+1-604-777-2486",
      cuisine: "pizza;pasta",
      website: "https://www.thatplace.ca/",
    },
    namedetails: {
      name: "That Place 4 Pasta & Pizza",
    },
  },
  {
    place_id: 52950289,
    licence:
      "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
    osm_type: "node",
    osm_id: 4698359490,
    boundingbox: ["49.2617709", "49.2618709", "-122.8908185", "-122.8907185"],
    lat: "49.2618209",
    lon: "-122.8907685",
    display_name:
      "Donair Town, 555, Clarke Road, Coquitlam, Metro Vancouver Regional District, British Columbia, V3J 3X0, Canada",
    place_rank: 30,
    category: "amenity",
    type: "restaurant",
    importance: 0.0001,
    icon: "https://nominatim.openstreetmap.org/ui/mapicons/food_restaurant.p.20.png",
    address: {
      amenity: "Donair Town",
      house_number: "555",
      road: "Clarke Road",
      city: "Coquitlam",
      county: "Metro Vancouver Regional District",
      state: "British Columbia",
      "ISO3166-2-lvl4": "CA-BC",
      postcode: "V3J 3X0",
      country: "Canada",
      country_code: "ca",
    },
    extratags: {
      cuisine: "lebanese",
      opening_hours: "Mo-Sa 11:00-20:00; Su 12:00-20:00",
    },
    namedetails: {
      name: "Donair Town",
      "name:en": "Donair Town",
    },
  },
  {
    place_id: 53274294,
    licence:
      "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
    osm_type: "node",
    osm_id: 4731543429,
    boundingbox: ["49.2274778", "49.2275778", "-122.8373393", "-122.8372393"],
    lat: "49.2275278",
    lon: "-122.8372893",
    display_name:
      "The Buffet, 2080, United Boulevard, Pacific Reach, Coquitlam, Metro Vancouver Regional District, British Columbia, V3K 3V5, Canada",
    place_rank: 30,
    category: "amenity",
    type: "restaurant",
    importance: 0.0001,
    icon: "https://nominatim.openstreetmap.org/ui/mapicons/food_restaurant.p.20.png",
    address: {
      amenity: "The Buffet",
      house_number: "2080",
      road: "United Boulevard",
      suburb: "Pacific Reach",
      city: "Coquitlam",
      county: "Metro Vancouver Regional District",
      state: "British Columbia",
      "ISO3166-2-lvl4": "CA-BC",
      postcode: "V3K 3V5",
      country: "Canada",
      country_code: "ca",
    },
    extratags: {},
    namedetails: {
      name: "The Buffet",
      "name:en": "The Buffet",
    },
  },
  {
    place_id: 53644551,
    licence:
      "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
    osm_type: "node",
    osm_id: 4731543439,
    boundingbox: ["49.2418622", "49.2419622", "-122.8845542", "-122.8844542"],
    lat: "49.2419122",
    lon: "-122.8845042",
    display_name:
      "Char 631 Steakhouse, 631, Lougheed Highway, Cariboo, Coquitlam, Metro Vancouver Regional District, British Columbia, V3K 3S5, Canada",
    place_rank: 30,
    category: "amenity",
    type: "restaurant",
    importance: 0.0001,
    icon: "https://nominatim.openstreetmap.org/ui/mapicons/food_restaurant.p.20.png",
    address: {
      amenity: "Char 631 Steakhouse",
      house_number: "631",
      road: "Lougheed Highway",
      suburb: "Cariboo",
      city: "Coquitlam",
      county: "Metro Vancouver Regional District",
      state: "British Columbia",
      "ISO3166-2-lvl4": "CA-BC",
      postcode: "V3K 3S5",
      country: "Canada",
      country_code: "ca",
    },
    extratags: {},
    namedetails: {
      name: "Char 631 Steakhouse",
      "name:en": "Char 631 Steakhouse",
    },
  },
  {
    place_id: 82206652,
    licence:
      "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
    osm_type: "node",
    osm_id: 8095772085,
    boundingbox: ["49.2491798", "49.2492798", "-122.858893", "-122.858793"],
    lat: "49.2492298",
    lon: "-122.858843",
    display_name:
      "Khob Khun Thai Cuisine, 1143, Austin Avenue, Austin Heights, Coquitlam, Metro Vancouver Regional District, British Columbia, V3K 0A0, Canada",
    place_rank: 30,
    category: "amenity",
    type: "restaurant",
    importance: 0.0001,
    icon: "https://nominatim.openstreetmap.org/ui/mapicons/food_restaurant.p.20.png",
    address: {
      amenity: "Khob Khun Thai Cuisine",
      house_number: "1143",
      road: "Austin Avenue",
      suburb: "Austin Heights",
      city: "Coquitlam",
      county: "Metro Vancouver Regional District",
      state: "British Columbia",
      "ISO3166-2-lvl4": "CA-BC",
      postcode: "V3K 0A0",
      country: "Canada",
      country_code: "ca",
    },
    extratags: {
      phone: "+1-604-939-0801",
      cuisine: "thai",
      website: "https://www.khobkhunthaicuisine.com/",
    },
    namedetails: {
      name: "Khob Khun Thai Cuisine",
    },
  },
  {
    place_id: 99267164,
    licence:
      "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
    osm_type: "node",
    osm_id: 9756190077,
    boundingbox: ["49.2618173", "49.2619173", "-122.8904166", "-122.8903166"],
    lat: "49.2618673",
    lon: "-122.8903666",
    display_name:
      "Me + Crêpe, 555, Clarke Road, Coquitlam, Metro Vancouver Regional District, British Columbia, V3J 3X0, Canada",
    place_rank: 30,
    category: "amenity",
    type: "restaurant",
    importance: 0.0001,
    icon: "https://nominatim.openstreetmap.org/ui/mapicons/food_restaurant.p.20.png",
    address: {
      amenity: "Me + Crêpe",
      house_number: "555",
      road: "Clarke Road",
      city: "Coquitlam",
      county: "Metro Vancouver Regional District",
      state: "British Columbia",
      "ISO3166-2-lvl4": "CA-BC",
      postcode: "V3J 3X0",
      country: "Canada",
      country_code: "ca",
    },
    extratags: {
      cuisine: "chinese",
      opening_hours: "Mo-Fr 09:00-14:30; Sa-Su 09:00-15:00",
    },
    namedetails: {
      name: "Me + Crêpe",
    },
  },
];

const RES = [
  {
    place_id: 216624966,
    licence:
      "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
    osm_type: "way",
    osm_id: 508870210,
    boundingbox: ["49.808969", "49.8093834", "-124.5028827", "-124.5023591"],
    lat: "49.8091818",
    lon: "-124.5024918",
    display_name:
      "Car, Penticton Maze, Area B (Paradise Valley), qathet Regional District, British Columbia, V8A 4Z2, Canada",
    class: "highway",
    type: "cycleway",
    importance: 0.27499999999999997,
    address: {
      road: "Car",
      neighbourhood: "Penticton Maze",
      city: "Area B (Paradise Valley)",
      county: "qathet Regional District",
      state: "British Columbia",
      "ISO3166-2-lvl4": "CA-BC",
      postcode: "V8A 4Z2",
      country: "Canada",
      country_code: "ca",
    },
  },
];

type PlaceType = {
  place_id: number;
  osm_id: number;
  osm_type: string;
  type: string;

  boundingbox: number[];
  lat: number;
  lon: number;
  display_name: string;
  address: {
    amenity: string;
    road: string;
    suburb: string;
    city_district: string;
    town: string;
    county: string;
    state: string;
    "ISO3166-2-lvl4": string;
    postcode: string;
    country: string;
    country_code: string;
  };
};

const icon = L.icon({
  iconUrl: "/images/marker-icon.png",
  iconSize: [24, 36],
  iconAnchor: [12, 36],
});

const Bound = ({ results }: { results: PlaceType[] }) => {
  const map = useMap();
  useEffect(() => {
    if (results.length > 0) {
      let bbox = results.reduce((tot, cur) => {
        if (!tot) {
          return cur.boundingbox;
        }
        const [t1, t2, t3, t4] = tot;
        const [c1, c2, c3, c4] = cur.boundingbox;

        return [
          Math.min(t1, c1),
          Math.max(t2, c2),
          Math.min(t3, c3),
          Math.max(t4, c4),
        ];
      }, undefined);

      const [l1, u1, l2, u2] = bbox;
      console.log();

      map.flyToBounds(
        [
          [l1, l2],
          [u1, u2],
        ],
        { padding: [15, 15], duration: 1.5, maxZoom: 15 }
      );
    }
  }, [results]);
  return null;
};

const Map = () => {
  const OSM_URL = "https://nominatim.openstreetmap.org/search.php?";
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const searchHandler = () => {
    const params = {
      q: search,
      addressdetails: "1",
      namedetails: "1",
      extratags: "1",
      countrycodes: "ca",
      //   countrycodes: "CA,US",
      limit: "50",
      viewbox: [-123, 45, -123 + 2, 45 + 2],
      //   viewbox: [-123, 45, -119, 50],
      bounded: "1",
      format: "jsonv2",
    };
    const queryString = new URLSearchParams(params).toString();
    // console.log(`${OSM_URL}${queryString}`);

    fetch(`${OSM_URL}${queryString}`, {
      method: "GET",
      redirect: "follow",
    })
      .then((res) => res.text())
      .then((r) => {
        // console.log(JSON.parse(r));

        setResults(JSON.parse(r));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="flex flex-col place-items-center">
      <div className="m-2 flex items-center overflow-hidden rounded-sm text-center align-middle outline outline-slate-500">
        <input
          type="text"
          placeholder="search bistro"
          className="mx-1 w-32"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <button
          className="px-2 text-lg font-semibold outline outline-slate-500"
          //   onClick={() => setResults([...RES])}
          onClick={searchHandler}
        >
          search
        </button>
      </div>

      <MapContainer
        center={[45, -123]}
        zoom={3}
        worldCopyJump
        scrollWheelZoom={true}
        className="aspect-[4/3] w-[90%] max-w-md rounded-md"
        zoomSnap={0.5}
        maxZoom={18}
        minZoom={3}
        maxBounds={[
          [-180, -360],
          [180, 360],
        ]}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright%22%3EOpenStreetMap</a> contributors'
        />
        {/* later for user location based nearby places */}
        {/* <Marker position={[49.5, -122.5]} icon={icon}></Marker>
        <Marker position={[49, -123.5]} icon={icon} />; */}
        {results.map((r: PlaceType, i) => {
          console.log(r);

          const {
            address,
            display_name,
            lat,
            lon,
            osm_id,
            osm_type,
            place_id,
            type,
          } = r;

          return (
            <Marker
              key={i}
              position={[Number(r.lat), Number(r.lon)]}
              icon={icon}
              eventHandlers={{
                // mouse,
                mouseover: (e) => {
                  console.log(e);
                },
              }}
            >
              <Popup
                eventHandlers={{
                  click: () => {
                    alert("clicked on popup pin");
                  },
                }}
                interactive
              >
                <button
                  className="outline"
                  onClick={() => {
                    alert("clicked in");
                  }}
                >
                  asd
                </button>
                <div className="text-md">
                  {"address.amenity: " + JSON.stringify(address?.amenity)}{" "}
                  <br />
                  {"display_name: " + JSON.stringify(display_name)} <br />
                  {"lat: " + JSON.stringify(lat)} <br />
                  {"lon: " + JSON.stringify(lon)} <br />
                  {"osm_id: " + JSON.stringify(osm_id)} <br />
                  {"osm_type: " + JSON.stringify(osm_type)} <br />
                  {"place_id: " + JSON.stringify(place_id)} <br />
                  {"type: " + JSON.stringify(type)} <br />
                </div>
              </Popup>
            </Marker>
          );
        })}
        <Bound results={results} />
      </MapContainer>
      <div className="flex max-w-[80%] flex-col">
        {RES_RES.map((r, i) => {
          const {
            address,
            category,
            display_name,
            extratags,
            osm_id,
            osm_type,
            type,
            namedetails,
          } = r;
          const { amenity } = address;

          //     OSM type && id defines a useful enough identifier
          //   {"osm_id: " + JSON.stringify(osm_id)} <br />
          //   {"osm_type: " + JSON.stringify(osm_type)} <br />
          //   {"place_id: " + JSON.stringify(r.place_id)} <br />

          //   {"display_name: " + JSON.stringify(display_name)} <br />
          //   address

          return (
            <div className="outline" key={i}>
              <div className="text-md outline">
                <span className="text-lg font-semibold">{amenity}</span>
                {"type: " + JSON.stringify(type)} <br />
                {"category: " + JSON.stringify(category)} <br />
                {extratags.cuisine}
                {/* {"extratags: " + JSON.stringify(extratags)} <br /> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Map;
