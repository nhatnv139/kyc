import React from 'react';
import { Card, Heading } from '@aws-amplify/ui-react';

export function NotFoundError() {
  return (
    <Card>
      <Heading level={6}>Page not found</Heading>
    </Card>
  );
}
