export const KYC_STATUS = {
  PENDING: 0,
  APPROVE: 1,
  REJECT: 2,
};

export const KYC_LIVE_CHECK = {
  NOT_PERSON: 0,
  PERSON: 1,
};

export const KYC_FACE_MATCH = {
  NOT_MATCH: 0,
  MATCH: 1,
};

export const CONFIG = {
  VITE_API_URL: import.meta.env.VITE_API_URL,
  VITE_AWS_PROJECT_REGION: import.meta.env.VITE_AWS_PROJECT_REGION,
  VITE_AWS_COGNITO_IDENTITY_POOL_ID: import.meta.env.VITE_AWS_COGNITO_IDENTITY_POOL_ID,
  VITE_AWS_COGNITO_REGION: import.meta.env.VITE_AWS_COGNITO_REGION,
};
