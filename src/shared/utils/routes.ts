const PATHS = {
  HOME: "/",

  // Protected routes that require authentication
  PROTECTED: {
    // Dashboard
    DASHBOARD: "/dashboard",

    // Mail
    MAIL_INCOMING: "/dashboard/mail/incoming",
    MAIL_INCOMING_CREATE: "/dashboard/mail/incoming/form",
    MAIL_INCOMING_DETAIL: (id: number) =>
      `/dashboard/mail/incoming/detail/${id}`,
    MAIL_INCOMING_EDIT: (id: number) => `/dashboard/mail/incoming/form/${id}`,

    MAIL_OUTGOING: "/dashboard/mail/outgoing",
    MAIL_OUTGOING_CREATE: "/dashboard/mail/outgoing/form",
    MAIL_OUTGOING_DETAIL: (id: number) =>
      `/dashboard/mail/outgoing/detail/${id}`,
    MAIL_OUTGOING_EDIT: (id: number) => `/dashboard/mail/outgoing/form/${id}`,

    // User Profile
    USER: "/dashboard/user",

    // Auth
    LOGOUT: "/auth/logout",
  },

  // Public routes that do not require authentication
  PUBLIC: {
    // Authentication routes
    AUTH: "/auth",
    LOGIN: "/auth/login",
    FORGOT_PASSWORD: "/auth/forgot-password",
    CHANGE_PASSWORD: "/auth/change-password",
  },
};

export default PATHS;
