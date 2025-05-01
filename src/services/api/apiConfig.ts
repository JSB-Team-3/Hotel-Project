


export const baseURL= "https://upskilling-egypt.com:3000/api/v0"
export const imgURL="https://upskilling-egypt.com:3000/"



export const USER_URLS={
    LOGIN:`/admin/users/login`,
    REGISTER:`/admin/users`,
    FORGET_PASS:`/portal/users/forgot-password`,
    RESET_PASS:`/admin/users/reset-password`,
    CHANGE_PASS:`/admin/users/change-password`,
    USER_PROFILE:(id:string)=>`/admin/users/${id}`,
}

export const ADMIN_USERS_URLS = {
  GET_ALL_USERS: `/admin/users`,
  GET_USER_PROFILE: (id: string) => `/admin/users/${id}`,
};

export const ADMIN_CHART_URLS = {
  GET_CHART: `/admin/dashboard`,
};


export const ADMIN_ROOMS_URLS = {
  CREATE_ROOM: `/admin/rooms`,
  UPDATE_ROOM: (id: string) => `/admin/rooms/${id}`,
  GET_ROOM_DETAILS: (id: string) => `/admin/rooms/${id}`,
  DELETE_ROOM: (id: string) => `/admin/rooms/${id}`,
  GET_ALL_ROOMS: `/admin/rooms`,
};

export const ADMIN_BOOKING_URLS = {
  GET_BOOKING_DETAILS: (id: string) => `/admin/booking/${id}`,
  DELETE_BOOKING: (id: string) => `/admin/booking/${id}`,
  GET_ALL_BOOKING: `/admin/booking`,
};

export const ADMIN_ROOM_FACILITIES_URLS = {
  CREATE_ROOM_FACILITIES: `/admin/room-facilities`,
  GET_ROOM_FACILITIES: `/admin/room-facilities`,
  GET_ROOM_FACILITY_DETAILS: (id: string) => `/admin/room-facilities/${id}`,
  DELETE_ROOM_FACILITIES: (id: string) => `/admin/room-facilities/${id}`,
  UPDATE_ROOM_FACILITIES: (id: string) => `/admin/room-facilities/${id}`,
};

export const ADMIN_ADS_URLS = {
  CREATE_AD: `/admin/ads`,
  GET_ADS: `/admin/ads`,
  GET_AD_DETAILS: (id: string) => `/admin/ads/${id}`,
  DELETE_AD: (id: string) => `/admin/ads/${id}`,
  UPDATE_AD: (id: string) => `/admin/ads/${id}`,
};
// po0rtal

export const Portal_ROOMS_URLS = {
  GET_ALL_PORTAL_ROOMS: `/portal/rooms/available`,
};