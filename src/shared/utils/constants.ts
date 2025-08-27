export const QUERIES = {
  AUTH: {
    VERIFY_PASSWORD_RESET_TOKEN: "verify-password-reset-token",
  },
  USER: {
    GET_USER: "get-user",
    UPDATE_USER: "update-user",
  },
  MAIL: {
    GET_INCOMING_MAILS: "get-incoming-mails",
    GET_INCOMING_MAIL: "get-incoming-mail",
    GET_INCOMING_MAIL_ATTACHMENTS: "get-incoming-mail-attachments",
    GET_INCOMING_MAIL_ATTACHMENT_DOWNLOAD:
      "get-incoming-mail-attachment-download",
    CREATE_INCOMING_MAIL: "create-incoming-mail",
    UPDATE_INCOMING_MAIL: "update-incoming-mail",
    DELETE_INCOMING_MAIL: "delete-incoming-mail",

    GET_OUTGOING_MAILS: "get-outgoing-mails",
    GET_OUTGOING_MAILS_PAGINATED: "get-outgoing-mails-paginated",
    GET_OUTGOING_MAIL: "get-outgoing-mail",
    GET_OUTGOING_MAIL_ATTACHMENTS: "get-outgoing-mail-attachments",
    GET_OUTGOING_MAIL_ATTACHMENT_DOWNLOAD:
      "get-outgoing-mail-attachment-download",
    CREATE_OUTGOING_MAIL: "create-outgoing-mail",
    UPDATE_OUTGOING_MAIL: "update-outgoing-mail",
    DELETE_OUTGOING_MAIL: "delete-outgoing-mail",
  },
};

export const SUPABASE_STORAGE = {
  BUCKET_NAME: "upz-bucket",
  INCOMING_MAIL_FOLDER: "mails/incoming",
  OUTGOING_MAIL_FOLDER: "mails/outgoing",
};

