import React from 'react';

const FormError = ({ message }: { message: string }) => {
  return (
    <div className="bg-red-100 text-red-700 p-2 text-sm rounded">{message}</div>
  );
};

export default FormError;
