import React from 'react';
import { Flex, Image } from '@aws-amplify/ui-react';
import closeImg from '../images/error.png';

export interface KycFailProps {
  displayText?: {
    rateLimit: String;
  };
}

export function KycFail(props: KycFailProps) {
  const displayText = props.displayText;
  return (
    <Flex
      justifyContent={'center'}
      alignItems={'center'}
      style={{ minHeight: '100vh', padding: '15%' }}
      direction={'column'}>
      <Image alt="KYC status" src={closeImg} objectFit="initial" width="50%"/>
      <div style={{ fontSize: '1em', textAlign: 'center' }}>{displayText?.rateLimit}</div>
    </Flex>
  );
}
