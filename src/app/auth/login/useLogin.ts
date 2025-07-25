'use client';

import { usePostLoginMutation } from '@/integrations/http/endpoints/auth';
import {
  LoginUserSchema,
  LoginUserSchemaType,
} from '@/lib/validations/login-user.schema';
import { useState } from 'react';

const INITIAL_FORM_STATE: LoginUserSchemaType = {
  email: '',
  password: '',
};

const useLogin = () => {
  const [triggerPostLoginMutation, { isLoading, isSuccess }] =
    usePostLoginMutation();
  const [error, setError] = useState<{
    properties?: Record<string, string[]>;
  }>();
  const [formState, setFormState] =
    useState<LoginUserSchemaType>(INITIAL_FORM_STATE);

  const handleFieldChange = (
    field: keyof LoginUserSchemaType,
    value: string
  ) => {
    setFormState(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const validatedFields = LoginUserSchema.safeParse(formState);

    if (!validatedFields.success) {
      setError({
        properties: validatedFields.error.flatten().fieldErrors,
      });
      return;
    }
    setError(undefined);
    triggerPostLoginMutation(formState).unwrap();
    setFormState(INITIAL_FORM_STATE);
    if (isSuccess) {
      alert('Login successful!');
    }
  };

  return {
    error,
    isLoading,
    formState,
    handleFieldChange,
    handleFormSubmit,
  };
};

export default useLogin;
