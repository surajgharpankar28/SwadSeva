// export const CON_URL = "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";

// export const MENU_API = "https://thingproxy.freeboard.io/fetch/https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=21.99740&lng=79.00110&restaurantId=";

export const CURATED_FOOD_TYPE = `${process.env.PARCEL_MEDIA_ASSETS_BASE_URL}image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/`;

export const CON_URL = `${process.env.PARCEL_MEDIA_ASSETS_BASE_URL}image/upload/fl_lossy,f_auto,q_auto,w_660/`;

// Swiggy API to get Restaurant data using swadseva server
export const SWADSEVA_API_URL = `${process.env.PARCEL_SWADSEVA_APP_BASE_URL}restaurants?lat=21.1702401&lng=72.83106070000001&page_type=DESKTOP_WEB_LISTING`;

// Swiggy API to get Restaurant Menu data using swadseva server
export const MENU_API = `${process.env.PARCEL_SWADSEVA_APP_BASE_URL}menu?page-type=REGULAR_MENU&complete-menu=true&lat=21.1702401&lng=72.83106070000001&&submitAction=ENTER&restaurantId=`;

// shimmer card unit
export const shimmer_card_unit = 20;

// shimmer Menu card unit
export const shimmer_menu_card_unit = 10;
